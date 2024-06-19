// page.tsx
import { RecipeForm } from "@/components/recipes/recipe-form";
import { createRecipeAction } from "@/db/actions";
import { getPublications } from "@/db/queries";
import { publicationsRelations } from "@/db/schema";

export default async function New() {
  const publications = await getPublications();
  const publicationOptions = (publications ?? []).map((publication) => ({
    value: publication.id,
    label: `${publication.name}-${publication.edition}`,
  }));

  return (
    <RecipeForm
      onSubmit={createRecipeAction}
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
  );
}
