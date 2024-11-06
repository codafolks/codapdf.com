import { InputController } from "@/components/app/forms";
import type { AuthInput } from "@/server/schemas/authZodSchema";
import type { Control, FieldValues } from "react-hook-form";

type AuthSignUpFormProps<T extends FieldValues = AuthInput> = {
  control: Control<T, object>;
};
export const AuthSignUpForm = ({ control }: AuthSignUpFormProps) => (
  <>
    <InputController label="Email" name="email" type="email" control={control} placeholder="Email" autoComplete="off" />
    <InputController label="Name" name="name" type="text" control={control} placeholder="Name" autoComplete="off" />
    <InputController label="Password" name="password" type="password" control={control} placeholder="Password" autoComplete="off" />
    <InputController label="Confirm Password" name="confirmPassword" type="password" control={control} placeholder="Confirm Password" autoComplete="off" />
  </>
);
