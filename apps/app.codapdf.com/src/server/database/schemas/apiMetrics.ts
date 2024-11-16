import { users } from "@/server/database/schemas/users";
import { relations, sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const apiMetrics = pgTable("apiMetrics", {
  uuid: uuid("uuid").primaryKey().default(sql`uuid_generate_v4()`).unique().notNull(),
  userId: serial("userId")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  endpoint: text("endpoint").notNull(),
  responseTimeMs: serial("responseTimeMs").notNull(),
  statusCode: serial("statusCode").notNull(),
  dataTransferredBytes: integer("dataTransferredBytes").notNull(),
  error: boolean("error").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
});

export const apiMetricsRelation = relations(apiMetrics, ({ one }) => ({
  user: one(users, {
    fields: [apiMetrics.userId],
    references: [users.id],
    relationName: "user_api_metrics",
  }),
}));
