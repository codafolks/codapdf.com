import { cn } from "@/client/lib/utils";

type DividerProps = {
  className?: string;
};
const Divider = ({ className }: DividerProps) => <div className={cn("border-gray-200 border-t", className)} />;

export { Divider };
