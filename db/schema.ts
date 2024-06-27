import { sql, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import {
  pgTableCreator,
  serial,
  varchar,
  timestamp,
  integer,
  text,
  char,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `goodgrub_${name}`);

export const publications = createTable("publications", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  author: varchar("author"),
  edition: varchar("edition"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
});

export const recipes = createTable("recipes", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  pageNumber: integer("page_number"),
  publicationId: integer("publication_id").references(() => publications.id, {
    onDelete: "set null",
  }),
  url: char("url", { length: 256 }),
  tags: text("tags")
    .array()
    .default(sql`'{}'::text[]`),
  preparationTime: integer("preparation_time"),
  cookingTime: integer("cooking_time"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
});

export const ratings = createTable("ratings", {
  id: serial("id").primaryKey().notNull(),
  value: integer("value").notNull(),
  title: varchar("title"),
  comments: varchar("comments"),
  userId: varchar("user_id").notNull(),
  recipeId: integer("recipe_id")
    .references(() => recipes.id, {
      onDelete: "set null",
    })
    .notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
});

export const publicationsRelationsMany = relations(
  publications,
  ({ many }) => ({
    recipes: many(recipes),
  }),
);

export const recipesRelationsOne = relations(recipes, ({ one }) => ({
  recipePublication: one(publications, {
    fields: [recipes.publicationId],
    references: [publications.id],
  }),
}));

export const ratingsRelationsOne = relations(ratings, ({ one }) => ({
  ratingRecipe: one(recipes, {
    fields: [ratings.recipeId],
    references: [recipes.id],
  }),
}));

export const recipesRelationsMany = relations(recipes, ({ many }) => ({
  ratings: many(ratings),
}));

export const insertRecipeSchema = createInsertSchema(recipes, {
  tags: z.array(z.string()).optional().nullable(),
});

export const insertPublicationSchema = createInsertSchema(publications);

export const insertRatingSchema = createInsertSchema(ratings);
