import * as React from "react";

import { cn } from "@/client/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, id, error, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium pb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "flex w-full rounded-[4px] min-h-20 border border-input bg-background px-3 py-2 text-sm ring-offset-background f placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
      <p
        className={cn("text-sm font-medium text-red-500 pt-1 hidden", {
          block: Boolean(error),
        })}
        data-error={props.name}
      >
        {error}
      </p>
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
