//queries.ts
import { db } from "@/db/drizzle";
import { sql, or, eq, ilike, avgDistinct } from "drizzle-orm";
import { recipes, publications, ratings } from "@/db/schema";

export async function getPublications() {
  const data = await db
    .select({
      id: publications.id,
      name: publications.name,
      edition: publications.edition,
      author: publications.author,
    })
    .from(publications);

  return data;
}
