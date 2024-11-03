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
    <div className={cn("px-4 py-2  grid grid-cols-[auto,max-content] gap-2 items-center ", color, className)}>
      <div>
        <span className="font-semibold text-black">{description}</span>
      </div>
      <div className="flex gap-2 items-center">
        {actions}
        <Icon className="text-black font-semibold" />
      </div>
    </div>
  );
};
