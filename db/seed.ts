import { config } from "dotenv";
import { seedPublications } from "@/db/seed-publications";
import { seedRecipes } from "@/db/seed-recipes";
import { seedRatings } from "@/db/seed-ratings";

import { publications, recipes, ratings } from "@/db/schema";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "@/db/schema";

export const db = drizzle(sql, { schema });

config({ path: ".env.local" });

const main = async () => {
  try {
    // Reset database
    await db.delete(ratings).execute();
    await db.delete(recipes).execute();
    await db.delete(publications).execute();
    // Seed publications
    await db.insert(publications).values(seedPublications).execute();
    // Seed recipes
    await db.insert(recipes).values(seedRecipes).execute();
    // Seed ratings
    await db.insert(ratings).values(seedRatings).execute();
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  }
};

main();
