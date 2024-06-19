"use server";

import { z } from "zod";
import {
  insertRecipeSchema,
  recipes,
  publications,
  ratings,
} from "@/db/schema";
import { db } from "@/db/drizzle";
import { sql, or, eq, ilike, avgDistinct } from "drizzle-orm";

export interface Recipe {
  id: number;
  name: string;
  tags: string[] | null;
  preparationTime: number | null;
  cookingTime: number | null;
  publicationId: number | null;
  publicationName: string | null;
  publicationEdition: string | null;
  pageNumber: number | null;
  author: string | null;
  rating: number | null;
}

export async function createRecipeAction(
  data: z.infer<typeof insertRecipeSchema>,
) {
  const parsedData = insertRecipeSchema.parse(data);

  const result = await db.insert(recipes).values(parsedData).returning();

  return result;
}

export async function getRecipes(searchText: string | null): Promise<Recipe[]> {
  const lowerSearchText = searchText ? searchText.toLowerCase() : null;
  const whereClause = searchText
    ? or(
        ilike(recipes.name, `%${searchText}%`),
        sql`EXISTS (
            SELECT 1 FROM unnest(${recipes.tags}) AS tag
            WHERE lower(tag) ILIKE '%' || ${lowerSearchText} || '%'
          )`,
        ilike(publications.name, `%${searchText}%`),
        ilike(publications.author, `%${searchText}%`),
      )
    : sql`TRUE`;

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
    .where(whereClause)
    .groupBy(recipes.id, publications.id);

  return data;
}
