"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/client/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

export type ComboBoxOption = {
  label: string;
  value: string | number;
  icon?: string;
};
export type ComboboxBoxProps = {
  options: Array<ComboBoxOption>;
  placeholder?: string;
  value?: string;
  label?: string;
  error?: string;
  name?: string;
  id?: string;
  onChange?: (value: string | number) => void;
};

const Option = (option: ComboBoxOption) => (
  <>
    {option?.icon && <Image src={option.icon} className="h-4 w-4" alt={option.label} width={16} height={16} />}
    {option.label}
  </>
);

export function ComboboxBox({ options, value, onChange, label, name, id, error, placeholder }: Readonly<ComboboxBoxProps>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [localValue, setLocalValue] = React.useState(value);

  const getSelectedOption = () => {
    const option = options?.find((option) => String(option.value) === String(value ?? localValue));
    if (option) {
      return <Option {...option} />;
    }
    return placeholder ?? "Select...";
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOnChange = (newValue: string) => {
    if (typeof onChange === "function") {
      onChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  };

  const listOptions = React.useMemo(() => {
    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  }, [search, options]);

  return (
    <div className="relative w-full">
      {label && (
        <label className="text-foreground block text-sm font-medium pb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input type="hidden" value={value ?? localValue ?? ""} defaultValue={value} name={name} id={id} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-full rounded-[4px] text-muted-foreground  border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50: hover:bg-background",
              {
                "border-red-500": !!error,
              },
            )}
            type="button"
          >
            <span className="flex items-center gap-2 text-ellipsis flex-1 overflow-hidden ">{getSelectedOption()}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col min-w-full p-0 rounded-none" align="start">
          <Command className="rounded-none" shouldFilter={false}>
            <CommandInput placeholder={placeholder ?? "Search..."} value={search} onValueChange={(e) => setSearch(e)} autoFocus />
            {!listOptions?.length && <CommandEmpty>No found.</CommandEmpty>}
            <CommandList>
              {listOptions
                .filter((e) => e.value && e.label)
                .map((option) => (
                  <CommandItem
                    key={option?.value}
                    value={String(option?.value)}
                    onSelect={(currentValue: string) => {
                      handleOnChange(currentValue === (value ?? localValue) ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center w-full gap-2 rounded-none"
                  >
                    <Option {...option} />
                    <Check className={cn("mr-2 h-4 w-4", value === option?.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm font-medium text-red-500 pt-1">{error}</p>}
    </div>
  );
}
