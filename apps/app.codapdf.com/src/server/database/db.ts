import "server-only";
import { env } from "@/constants/env.server";
import { schemas } from "@/database/schemas";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let connection: postgres.Sql;
const isProd = process.env.APP_DOMAIN?.includes("https://");
if (isProd) {
  connection = postgres(env.DATABASE_URL, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };
  if (!globalConnection.connection) {
    globalConnection.connection = postgres(env.DATABASE_URL, {
      prepare: false,
    });
  }
  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema: schemas,
  logger: false,
});

export { db };
