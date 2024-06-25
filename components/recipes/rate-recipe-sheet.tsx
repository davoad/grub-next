import { z } from "zod";
import { useEffect, useState } from "react";
import { RateRecipeForm } from "@/components/recipes/rate-recipe-form";
import { useRateRecipe } from "@/hooks/recipes/use-rate-recipe";
import { Rating, createRatingAction, getRatingAction } from "@/db/actions";
import { insertRatingSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertRatingSchema.pick({
  value: true,
  comments: true,
});

type FormValues = z.input<typeof formSchema>;

export const RateRecipeSheet = () => {
  const [rating, setRating] = useState<Rating | null>(null);
  const { recipeId, isOpen, onClose } = useRateRecipe();

  useEffect(() => {
    if (!recipeId) return;

    const fetchRating = async () => {
      const fetchedRating = await getRatingAction(recipeId);
      setRating(fetchedRating[0]);
    };

    fetchRating();
  }, [recipeId]);

  const onSubmit = async (values: FormValues) => {
    if (!recipeId) return;
    await createRatingAction(recipeId, { ...values });
    onClose();
  };

  const defaultValues = rating || {
    value: 0,
    comments: null,
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Rate recipe</SheetTitle>
        </SheetHeader>
        <RateRecipeForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </SheetContent>
    </Sheet>
  );
};
