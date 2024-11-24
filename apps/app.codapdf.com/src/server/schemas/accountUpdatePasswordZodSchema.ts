import { authZodSchemaBase } from "@/server/schemas/authZodSchema";
import { z } from "zod";

const sharedPasswordZod = authZodSchemaBase.pick({ password: true }).shape.password;
export const accountUpdatePasswordZodSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: sharedPasswordZod,
    confirmPassword: sharedPasswordZod,
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: "Passwords do not match" };
    }
    return {};
  });
export const accountSetPasswordZodSchema = z
  .object({
    currentPassword: z.string().optional(),
    password: sharedPasswordZod,
    confirmPassword: sharedPasswordZod,
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: "Passwords do not match" };
    }
    return {};
  });

export type AccountSetPasswordInput = z.infer<typeof accountSetPasswordZodSchema>;
export type AccountUpdatePasswordInput = z.infer<typeof accountUpdatePasswordZodSchema>;
