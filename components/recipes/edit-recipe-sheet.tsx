import { z } from "zod";

import { useEditRecipe } from "@/hooks/recipes/use-edit-recipe";
import { RecipeForm } from "@/components/recipes/recipe-form";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { use, useEffect, useState } from "react";
import {
  SimpleRecipe,
  getPublicationsAction,
  getRecipeAction,
  updateRecipeAction,
  deleteRecipeAction,
} from "@/db/actions";

import { insertRecipeSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertRecipeSchema.pick({
  name: true,
  pageNumber: true,
  tags: true,
  preparationTime: true,
  cookingTime: true,
  publicationId: true,
});

type Publication = {
  id: number;
  name: string;
  edition: string | null;
};

type FormValues = z.input<typeof formSchema>;

export const EditRecipeSheet = () => {
  const [recipe, setRecipe] = useState<SimpleRecipe | null>(null);
  const { id, isOpen, onClose } = useEditRecipe();
  const queryClient = useQueryClient();

  const { data: publications, refetch } = useQuery({
    queryKey: ["publications"],
    queryFn: () => getPublicationsAction(null),
    initialData: [],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeAction(id);
      setRecipe(fetchedRecipe[0]);
    };

    fetchRecipe();
  }, [id]);

  const publicationOptions = publications.map((publication) => ({
    value: publication.id,
    label: `${publication.name}${publication.edition ? ` (${publication.edition})` : ""}`,
  }));

  const onSubmit = async (values: FormValues) => {
    if (!id) return;
    await updateRecipeAction(id, values);
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
    onClose();
  };

  const onDelete = async () => {
    if (!id) return;
    await deleteRecipeAction(id);
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
    onClose();
  };

  const defaultValues = recipe || {
    name: "",
    pageNumber: null,
    tags: [],
    preparationTime: null,
    cookingTime: null,
    publicationId: null,
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Recipe</SheetTitle>
        </SheetHeader>

        <RecipeForm
          id={id}
          onSubmit={onSubmit}
          onDelete={onDelete}
          publicationOptions={publicationOptions}
          defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  );
};
