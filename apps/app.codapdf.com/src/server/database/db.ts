import "server-only";
import { env } from "@/constants/env.server";
import { schemas } from "@/database/schemas";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalConnection = global as typeof globalThis & {
  connection: postgres.Sql;
};

if (!globalConnection.connection) {
  globalConnection.connection = postgres(env.DATABASE_URL, {
    prepare: false,
    max: 10,
  });
}
const connection = globalConnection.connection;
const db = drizzle(connection, {
  schema: schemas,
  logger: false,
});

export { db };
