import { z } from "zod";

import { useNewRecipe } from "@/hooks/recipes/use-new-recipe";
import { useQueryClient } from "@tanstack/react-query";
import { RecipeForm } from "@/components/recipes/recipe-form";
import { createRecipeAction, getPublicationsAction } from "@/db/actions";

import { insertRecipeSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";

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

export const NewRecipeSheet = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const { isOpen, onClose } = useNewRecipe();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPublications = async () => {
      const fetchedPublications = await getPublicationsAction(null);
      setPublications(fetchedPublications);
    };

    fetchPublications();
  }, []);

  const publicationOptions = publications.map((publication) => ({
    value: publication.id,
    label: `${publication.name}${publication.edition ? ` (${publication.edition})` : ""}`,
  }));

  const onSubmit = async (values: FormValues) => {
    await createRecipeAction(values);
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Recipe</SheetTitle>
        </SheetHeader>

        <RecipeForm
          id={null}
          onSubmit={onSubmit}
          publicationOptions={publicationOptions}
          defaultValues={{
            name: "",
            pageNumber: null,
            tags: [],
            preparationTime: null,
            cookingTime: null,
            publicationId: null,
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
