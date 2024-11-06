"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/client/lib/utils";

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  error?: string;
  label?: string;
};
const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(({ className, error, label, id, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        { "border-red-500": !!error },
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <CheckIcon className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
