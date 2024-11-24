import { InputController } from "@/components/app/forms";
import type { AuthInput } from "@/server/schemas/authZodSchema";
import type { Control, FieldValues } from "react-hook-form";

type AuthForgotPasswordFormProps<T extends FieldValues = AuthInput> = {
  control: Control<T, object>;
};
export const AuthForgotPasswordForm = ({ control }: AuthForgotPasswordFormProps) => (
  <InputController
    label="Email"
    name="email"
    type="email"
    hepText="We'll send you a password reset link"
    control={control}
    placeholder="Email"
    autoComplete="off"
  />
);
