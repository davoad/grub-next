import { db } from "@/db/drizzle"; // Import the 'eq' function from the 'drizzle' module
import { publications, recipes, ratings } from "@/db/schema";
import { avgDistinct, eq } from "drizzle-orm";

export async function getPublications() {
  const data = await db
    .select({
      id: publications.id,
      name: publications.name,
      edition: publications.edition,
      author: publications.author,
    })
    .from(publications)
    .orderBy(publications.name, publications.edition);

  return data;
}

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

  return data;
}
