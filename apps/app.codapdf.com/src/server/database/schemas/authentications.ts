import { users } from "@/server/database/schemas/users";
import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const authProvider = pgEnum("providers", ["github", "google", "email"]);
export const authProviderEnumValues = authProvider.enumValues;
export const authProviderZodSchema = z.enum(authProviderEnumValues);
export type AuthProvider = z.infer<typeof authProviderZodSchema>;

export const authentications = pgTable("authentications", {
  id: serial("id").primaryKey().unique(),
  uuid: uuid("uuid").default(sql`uuid_generate_v4()`).unique().notNull(),
  userId: serial("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  providerId: text("providerId").notNull(),
  provider: authProvider("provider").notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});

export const authenticationsRelation = relations(authentications, ({ one }) => ({
  user: one(users, {
    fields: [authentications.userId],
    references: [users.id],
    relationName: "user_authentications",
  }),
}));
