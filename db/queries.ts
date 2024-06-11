import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { recipes, publications } from "@/db/schema";
export async function getRecipes() {
  const data = await db
    .select({
      id: recipes.id,
      name: recipes.name,
      tags: recipes.tags,
      preparationTime: recipes.preparationTime,
      cookingTime: recipes.cookingTime,
      publicationId: recipes.publicationId,
      publicationName: publications.name,
      publicationEdition: publications.edition,
      pageNumber: recipes.pageNumber,
      author: publications.author,
    })
    .from(recipes)
    .leftJoin(publications, eq(recipes.publicationId, publications.id));

  return { data };
}
