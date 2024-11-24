import { authentications } from "@/server/database/schemas/authentications";
import { licenses } from "@/server/database/schemas/licenses";
import { subscriptions } from "@/server/database/schemas/subscriptions";
import { type InferInsertModel, type InferSelectModel, relations, sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  uuid: uuid("uuid").default(sql`uuid_generate_v4()`).unique().notNull(),
  customerId: text("customerId").unique(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  name: text("name").notNull(),
  password: text("password"),
  image: text("image"),
  createdAt: timestamp("createdAt").default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey().unique(),
  userId: serial("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  bio: text("bio"),
  license: licenses("license"),
  phone: text("phone"),
  createdAt: timestamp("createdAt").default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
    relationName: "user_profiles",
  }),
  subscriptions: many(subscriptions, {
    relationName: "user_subscriptions",
  }),
  authentications: many(authentications, {
    relationName: "user_authentications",
  }),
}));

export const profileZodSchema = createSelectSchema(profiles);
export const profileUpdateZodSchema = createInsertSchema(profiles);
export const userZodSchema = createSelectSchema(users).extend({
  profile: profileZodSchema,
});

export type User = z.infer<typeof userZodSchema>;
export type Profile = InferSelectModel<typeof profiles>;
export type ProfileUpdate = InferInsertModel<typeof profiles>;
