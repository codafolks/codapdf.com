"use client";
import { cn } from "@/client/lib/utils";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import * as React from "react";
import type { ClassNameValue } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hepText?: string;
  hideTextError?: boolean;
  inputClassName?: ClassNameValue;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, id, label, error, hepText, inputClassName, hideTextError, name, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className=" block pb-1 font-medium text-sm">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {type === "password" && (
          <Button className="absolute right-3 p-0" type="button" variant="ghost" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {!isPasswordVisible ? <EyeClosedIcon className="h-4 w-4" /> : <EyeOpenIcon className="h-4 w-4" />}
          </Button>
        )}
        <input
          type={isPasswordVisible ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-[4px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            inputClassName,
          )}
          ref={ref}
          id={id}
          name={name}
          {...props}
        />
      </div>

      <p
        className={cn("hidden pt-1 font-medium text-red-500 text-sm", {
          block: Boolean(error),
        })}
        data-error={name}
      >
        {error}
      </p>
      {hepText && <p className="pt-1 font-medium text-muted-foreground text-sm">{hepText}</p>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
