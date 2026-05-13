import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema";
import { getPostgresUrl } from "./env";

const sql = createPool({ connectionString: getPostgresUrl() });

export const db = drizzle(sql, { schema });
