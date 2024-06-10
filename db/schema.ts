import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  varchar,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `goodgrub_${name}`);

export const publications = createTable("publications", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  author: varchar("author"),
  edition: varchar("edition"),
  createdAt: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const recipes = createTable("recipes", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  pageNumber: integer("page_number"),
  publicationId: integer("publication_id"),
  tags: text("tags").default("{}").array(),
  preparationTime: integer("preparation_time"),
  cookingTime: integer("cooking_time"),
  createdAt: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const ratings = createTable("ratings", {
  id: serial("id").primaryKey().notNull(),
  value: integer("value").notNull(),
  title: varchar("title"),
  comments: varchar("comments"),
  userId: varchar("user_id"),
  recipeId: integer("recipe_id"),
  createdAt: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});
