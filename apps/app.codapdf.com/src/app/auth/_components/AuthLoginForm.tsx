import { InputController } from "@/components/app/forms";
import type { AuthInput } from "@/server/schemas/authZodSchema";
import type { Control, FieldValues } from "react-hook-form";

type AuthLoginFormProps<T extends FieldValues = AuthInput> = {
  control: Control<T, object>;
};

export const AuthLoginForm = ({ control }: AuthLoginFormProps) => (
  <>
    <InputController label="Email" name="email" type="email" control={control} placeholder="Email" />
    <InputController
      label="Password"
      name="password"
      type="password"
      control={control}
      placeholder="Password"
      autoComplete="off"
    />
  </>
);
