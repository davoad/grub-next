import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { getPostgresUrl } from "./db/env";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getPostgresUrl(),
  },
  verbose: true,
  strict: true,
});
