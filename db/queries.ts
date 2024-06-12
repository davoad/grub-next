import { db } from "@/db/drizzle";
import { eq, avgDistinct } from "drizzle-orm";
import { recipes, publications, ratings } from "@/db/schema";
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
      rating: avgDistinct(ratings.value).mapWith(Number),
    })
    .from(recipes)
    .leftJoin(publications, eq(recipes.publicationId, publications.id))
    .leftJoin(ratings, eq(recipes.id, ratings.recipeId))
    .groupBy(recipes.id, publications.id);

  return { data };
}

export async function getPublications() {
  const data = await db
    .select({
      id: publications.id,
      name: publications.name,
      edition: publications.edition,
      author: publications.author,
    })
    .from(publications);

  return { data };
}
