import { users } from "@/server/database/schemas/users";

import { type InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscriptionsStatus = pgEnum("subscriptions_status", ["ACTIVE", "PENDING", "CANCELED"]);
export const subscriptionsFrequency = pgEnum("subscriptions_frequency", ["MONTHLY", "YEARLY"]);
export const subscriptionsFrequencyZodSchema = z.enum(subscriptionsFrequency.enumValues);
export type SubscriptionsFrequency = z.infer<typeof subscriptionsFrequencyZodSchema>;

export const productNickname = pgEnum("product_nickname", ["hobby", "basic", "pro", "enterprise"]);
export const productNicknameZodSchema = z.enum(productNickname.enumValues);
export type ProductNickname = z.infer<typeof productNicknameZodSchema>;

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey().unique(),
  priceId: text("priceId").notNull().default(sql`'None'`),
  productId: text("productId").notNull().default(sql`'None'`),
  priceAmount: integer("priceAmount").notNull().default(sql`0`),
  productNickname: productNickname("productNickname").notNull(),
  subscriptionId: text("subscriptionId").notNull().default(sql`'None'`),
  userId: serial("userId")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  frequency: subscriptionsFrequency("frequency").notNull().default(sql`'MONTHLY'`),
  status: subscriptionsStatus("status").notNull().default(sql`'PENDING'`),
  clientSecret: text("clientSecret").notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});

export const subscriptionsRelation = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
    relationName: "user_subscriptions",
  }),
}));

export const subscriptionsZodSchema = createInsertSchema(subscriptions);
export const subscriptionsUpdateZodSchema = createInsertSchema(subscriptions).extend({
  id: z.number(),
});

export type Subscription = InferSelectModel<typeof subscriptions>;
export type SubscriptionPayload = z.infer<typeof subscriptionsZodSchema>;
