import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SelectProps = {
  value: string;
  label?: string;
  id?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};
export function Select({ value, options, placeholder = "Select..", onChange, label, id }: SelectProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className=" block pb-1 font-medium text-sm">
          {label}
        </label>
      )}
      <BaseSelect value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id={id}>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </div>
  );
}
