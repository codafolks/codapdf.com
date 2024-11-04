import { Checkbox, CheckboxProps } from "@/client/components/ui/checkbox";
import { type Control, type FieldValues, Path, useController } from "react-hook-form";

type CheckBoxGroupControllerProps<T extends FieldValues> = Omit<CheckboxProps, "name"> & {
  control: Control<T, object>;
  name: Path<T>;
  options: Array<{
    label?: string;
    id: string;
  }>;
};

const CheckBoxGroupController = <T extends FieldValues>({
  name,
  control,
  options,
  ...rest
}: CheckBoxGroupControllerProps<T>) => {
  const {
    fieldState: { error },
    field: { value, onChange },
  } = useController<T>({ control, name });
  return (
    <>
      {options.map((item) => (
        <Checkbox
          key={item.id}
          {...rest}
          name={name}
          value={item.id}
          id={item.id}
          label={item.label}
          checked={value?.includes(item.id)}
          error={error?.message}
          onCheckedChange={() => {
            const isChecked = value?.includes(item.id);
            if (!isChecked) {
              onChange([...(value || []), item.id]);
            } else {
              onChange((value || []).filter((v) => v !== item.id));
            }
          }}
        />
      ))}
    </>
  );
};

export { CheckBoxGroupController };
