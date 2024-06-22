import { db } from "@/db/drizzle";
import { publications } from "@/db/schema";
import { PgColumn } from "drizzle-orm/pg-core";

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
function orderBy(
  name: PgColumn<
    {
      name: "name";
      tableName: "publications";
      dataType: "string";
      columnType: "PgVarchar";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
    },
    {},
    {}
  >,
  edition: PgColumn<
    {
      name: "edition";
      tableName: "publications";
      dataType: "string";
      columnType: "PgVarchar";
      data: string;
      driverParam: string;
      notNull: false;
      hasDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
    },
    {},
    {}
  >,
) {
  throw new Error("Function not implemented.");
}
