const connectionString = process.env.DATABASE_URL ?? "";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/server/database/schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString,
  },
});

