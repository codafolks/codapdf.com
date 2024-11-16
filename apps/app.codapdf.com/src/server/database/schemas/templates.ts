import { users } from "@/server/database/schemas/users";
import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, serial, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const templates = pgTable(
  "templates",
  {
    id: serial("id").primaryKey().unique(),
    uuid: uuid("uuid").default(sql`uuid_generate_v4()`).unique().notNull(),
    name: text("name").notNull().unique(),
    thumbnail: text("thumbnail"),
    description: text("description"),
    filesName: jsonb("filesName").$type<Array<string>>().notNull(),
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
      uniqueTemplatesName: unique().on(table.name, table.userId),
    };
  },
);

export const templatesRelation = relations(templates, ({ one }) => ({
  user: one(users, {
    fields: [templates.userId],
    references: [users.id],
    relationName: "user_templates",
  }),
}));

export const templateOnSelectZodSchema = createSelectSchema(templates);
export const templateOnInsertZodSchema = createInsertSchema(templates).extend({
  filesName: z.array(z.string()),
});

// When saving a template, the user ID is not required because it is already in the context.
// The files will be add from the template builder.
// This is the payload that will be sent to the server.
export const templateOnSaveZodSchema = templateOnInsertZodSchema.extend({
  useId: z.string().optional(),
  files: z.array(z.object({ filename: z.string(), content: z.string() })),
  // The HTML template.
  html: z.string(),
});

// The payload that will be sent to the server when fetching the schema.
export const templateOnFetchZodSchema = templateOnSelectZodSchema.extend({
  files: z.array(z.object({ filename: z.string(), content: z.string() })),
});

export const templateExample = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  files: z.array(
    z.object({
      filename: z.string(),
      content: z.string(),
    }),
  ),
});

export type TemplateOnSavePayload = z.infer<typeof templateOnSaveZodSchema>;
export type TemplateOnFetchPayload = z.infer<typeof templateOnFetchZodSchema>;
export type TemplateOnInsertPayload = z.infer<typeof templateOnInsertZodSchema>;
export type TemplateOnSelectPayload = z.infer<typeof templateOnSelectZodSchema>;
export type Template = z.infer<typeof templateOnSelectZodSchema>;
export type TemplateExample = z.infer<typeof templateExample>;
