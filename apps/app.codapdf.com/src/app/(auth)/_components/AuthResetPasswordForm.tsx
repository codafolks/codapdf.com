import { InputController } from "@/components/app/forms";
import type { AuthInput } from "@/server/schemas/authZodSchema";
import type { Control, FieldValues } from "react-hook-form";

type AuthResetPasswordFormProps<T extends FieldValues = AuthInput> = {
  control: Control<T, object>;
};
export const AuthResetPasswordForm = ({ control }: AuthResetPasswordFormProps) => (
  <>
    <InputController label="Password" name="password" type="password" control={control} placeholder="Password" autoComplete="off" />
    <InputController label="Confirm Password" name="confirmPassword" type="password" control={control} placeholder="Confirm Password" autoComplete="off" />
  </>
);
