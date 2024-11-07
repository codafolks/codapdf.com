import { Checkbox, type CheckboxProps } from "@/client/components/ui/checkbox";
import { type Control, Controller, type FieldValues, type Path, useController } from "react-hook-form";

type CheckBoxControllerProps<T extends FieldValues> = Omit<CheckboxProps, "name"> & {
  control: Control<T, object>;
  name: Path<T>;
};

const CheckBoxController = <T extends FieldValues>({ name, control, ...rest }: CheckBoxControllerProps<T>) => {
  const {
    fieldState: { error },
  } = useController<T>({ control, name });
  return <Controller control={control} name={name} render={({ field }) => <Checkbox {...rest} value={field.value ?? ""} onChange={field.onChange} error={error?.message} />} />;
};

export { CheckBoxController };
