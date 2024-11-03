import { cn } from "@/client/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

export type StatusBarVariant = "info" | "warning" | "error" | "success";
type StatusBarProps = {
  description: string;
  variant: StatusBarVariant;
  actions?: React.ReactNode;
  className?: string;
};

export const StatusBar = ({ description, variant, actions, className }: StatusBarProps) => {
  const color = {
    info: "bg-blue-400",
    warning: "bg-yellow-300",
    error: "bg-red-400",
    success: "bg-green-400",
  }[variant];

  const Icon = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle,
  }[variant];

  return (
    <div className={cn("grid grid-cols-[auto,max-content] items-center gap-2 px-4 py-2 ", color, className)}>
      <div>
        <span className="font-semibold text-black">{description}</span>
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <Icon className="font-semibold text-black" />
      </div>
    </div>
  );
};
