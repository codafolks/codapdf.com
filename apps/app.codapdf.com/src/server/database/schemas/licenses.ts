import { pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";

export const licenses = pgEnum("licenses", ["HOBBY", "BASIC", "PRO", "ENTERPRISE"]);
export const licensesEnumValues = licenses.enumValues;
export const licensesZodSchema = z.enum(licensesEnumValues);
export type License = z.infer<typeof licensesZodSchema>;
