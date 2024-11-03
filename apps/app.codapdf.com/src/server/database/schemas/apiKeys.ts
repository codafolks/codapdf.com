import { users } from "@/server/database/schemas/users";
import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
export const apiKeys = pgTable(
  "api_keys",
  {
    uuid: uuid("uuid").default(sql`uuid_generate_v4()`).unique().notNull(),
    name: text("name").unique().notNull(),
    userId: serial("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("createdAt").default(sql`now()`),
    updatedAt: timestamp("updatedAt").default(sql`now()`),
  },
  (table) => {
    return {
      uniqueApiKeyName: unique().on(table.name, table.userId),
    };
  },
);

export const apiKeyZodDBSchema = createSelectSchema(apiKeys);
export const apiKeyZodSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const apiKeyZodCreateSchema = apiKeyZodSchema.omit({
  userId: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

export type ApiKey = z.infer<typeof apiKeyZodSchema>;
export type ApiKeyDB = z.infer<typeof apiKeyZodDBSchema>;
