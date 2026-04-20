"use server";

import { z } from "zod";
import {
  insertRecipeSchema,
  insertPublicationSchema,
  recipes,
  publications,
  ratings,
  insertRatingSchema,
} from "@/db/schema";
import { db } from "@/db/drizzle";
import { sql, or, eq, ilike, avgDistinct, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

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

export interface SimpleRecipe {
  id: number;
  name: string;
  tags: string[] | null;
  preparationTime: number | null;
  cookingTime: number | null;
  publicationId: number | null;
  pageNumber: number | null;
}

export interface Publication {
  id: number;
  name: string;
  edition: string | null;
  author: string | null;
}

export interface Rating {
  id: number;
  value: number;
  recipeId: number;
  userId: string;
  title: string | null;
  comments: string | null;
}

export async function updateRecipeAction(
  id: number,
  data: z.infer<typeof insertRecipeSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const updatedData = {
    ...data,
    updatedAt: new Date(),
  };
  const result = await db
    .update(recipes)
    .set(updatedData)
    .where(eq(recipes.id, id))
    .returning();
  return result;
}

export async function deleteRecipeAction(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = await db.delete(recipes).where(eq(recipes.id, id)).returning();
  return result;
}

export async function createRecipeAction(
  data: z.infer<typeof insertRecipeSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const parsedData = insertRecipeSchema.parse(data);
  const result = await db.insert(recipes).values(parsedData).returning();

  return result;
}

export async function getRecipesAction(
  searchText: string | null,
): Promise<Recipe[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
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

export async function getRecipeAction(id: number): Promise<SimpleRecipe[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const data = await db
    .select({
      id: recipes.id,
      name: recipes.name,
      tags: recipes.tags,
      preparationTime: recipes.preparationTime,
      cookingTime: recipes.cookingTime,
      publicationId: recipes.publicationId,
      pageNumber: recipes.pageNumber,
    })
    .from(recipes)
    .leftJoin(publications, eq(recipes.publicationId, publications.id))
    .where(eq(recipes.id, id));

  return data;
}

export async function updatePublicationAction(
  id: number,
  data: z.infer<typeof insertPublicationSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const updatedData = {
    ...data,
    updatedAt: new Date(),
  };
  const result = await db
    .update(publications)
    .set(updatedData)
    .where(eq(publications.id, id))
    .returning();
  return result;
}

export async function deletePublicationAction(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = await db
    .delete(publications)
    .where(eq(publications.id, id))
    .returning();
  return result;
}

export async function createPublicationAction(
  data: z.infer<typeof insertPublicationSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const parsedData = insertPublicationSchema.parse(data);
  const result = await db.insert(publications).values(parsedData).returning();

  return result;
}

export async function getPublicationAction(id: number): Promise<Publication[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const data = await db
    .select({
      id: publications.id,
      name: publications.name,
      edition: publications.edition,
      author: publications.author,
    })
    .from(publications)
    .where(eq(publications.id, id));

  return data;
}

export async function getPublicationsAction(
  searchText: string | null,
): Promise<Publication[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const whereClause = searchText
    ? or(
        ilike(publications.name, `%${searchText}%`),
        ilike(publications.author, `%${searchText}%`),
        ilike(publications.edition, `%${searchText}%`),
      )
    : sql`TRUE`;

  const data = await db
    .select({
      id: publications.id,
      name: publications.name,
      edition: publications.edition,
      author: publications.author,
    })
    .from(publications)
    .where(whereClause)
    .orderBy(publications.name, publications.edition);

  return data;
}
const createRatingSchema = insertRatingSchema.pick({
  value: true,
  comments: true,
});
export async function createRatingAction(
  recipeId: number,
  data: z.infer<typeof createRatingSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const parsedData = createRatingSchema.parse(data);

  const existingRating = await db
    .select()
    .from(ratings)
    .where(and(eq(ratings.recipeId, recipeId), eq(ratings.userId, userId)));

  if (existingRating.length === 1) {
    const updatedData = {
      ...parsedData,
      updatedAt: new Date(),
    };

    await db
      .update(ratings)
      .set(updatedData)
      .where(and(eq(ratings.recipeId, recipeId), eq(ratings.userId, userId)));
  } else {
    await db.insert(ratings).values({
      ...parsedData,
      recipeId,
      userId,
    });
  }
}

export async function getRatingAction(recipeId: number): Promise<Rating[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const data = await db
    .select({
      id: ratings.id,
      value: ratings.value,
      title: ratings.title,
      comments: ratings.comments,
      userId: ratings.userId,
      recipeId: ratings.recipeId,
    })
    .from(ratings)
    .where(and(eq(ratings.recipeId, recipeId), eq(ratings.userId, userId)));

  return data;
}
