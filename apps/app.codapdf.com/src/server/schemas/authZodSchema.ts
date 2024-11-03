import { z } from "zod";

export const authZodSchemaBase = z.object({
  email: z.string().email(),
  // Password must be at least 8 characters
  // and contain at least one number
  // and one uppercase letter
  // and one lowercase letter
  // and one special character
  name: z.string().min(3),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, {
    message:
      "Password must be at least 8 characters and contain at least one number, one uppercase letter, one lowercase letter, and one special character",
  }),

  // confirmPassword must be equal to password
  confirmPassword: z.string(),
});

export const authLoginZodSchema = authZodSchemaBase.omit({ confirmPassword: true, name: true }).extend({
  password: z.string(),
});

export const authForgotPasswordZodSchema = authZodSchemaBase.pick({
  email: true,
});

export const authResetPasswordZodSchema = authZodSchemaBase
  .pick({
    password: true,
    confirmPassword: true,
  })
  .extend({
    token: z.string(),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: "Passwords do not match" };
    }
    return {};
  });

export const authSignupZodSchema = authZodSchemaBase.superRefine((data) => {
  if (data.password !== data.confirmPassword) {
    return { confirmPassword: "Passwords do not match" };
  }
  return {};
});

export type AuthSignupInput = z.infer<typeof authSignupZodSchema>;
export type AuthLoginInput = z.infer<typeof authLoginZodSchema>;
export type AuthForgotPasswordInput = z.infer<typeof authForgotPasswordZodSchema>;
export type AuthResetPasswordInput = z.infer<typeof authResetPasswordZodSchema>;

export type AuthInput = AuthSignupInput | AuthLoginInput | AuthForgotPasswordInput | AuthResetPasswordInput;
