import { users } from "@/server/database/schemas/users";
import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
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
    apiKey: text("apiKey").unique().notNull(),
    createdAt: timestamp("createdAt").default(sql`now()`),
    updatedAt: timestamp("updatedAt").default(sql`now()`),
  },
  (table) => {
    return {
      uniqueApiKeyName: unique().on(table.name, table.userId),
    };
  },
);

export const apiKeysRelation = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id],
    relationName: "user_api_key",
  }),
}));

export const apiKeyZodSchema = createSelectSchema(apiKeys);

export const apiKeyZodCreateSchema = apiKeyZodSchema.omit({
  userId: true,
  uuid: true,
  apiKey: true,
  createdAt: true,
  updatedAt: true,
});

export type ApiKey = z.infer<typeof apiKeyZodSchema>;
