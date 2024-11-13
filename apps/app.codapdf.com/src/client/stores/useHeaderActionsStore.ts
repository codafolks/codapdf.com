import type { ButtonVariants } from "@/components/ui/button";
import type { ReactNode } from "react";
import { create } from "zustand";

type HeaderAction = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  submitting?: boolean;
  disabled?: boolean;
  buttonVariant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  menuItems?: Array<HeaderAction>;
  className?: string;
};

type UseHeaderActionsStore = {
  actions: Array<HeaderAction>;
  add: (actions: Array<HeaderAction>) => void;
  clear: () => void;
};
const useHeaderActionsStore = create<UseHeaderActionsStore>((set) => ({
  actions: [],
  add: (actions) => set(() => ({ actions })),
  clear: () => set(() => ({ actions: [] })),
}));

export { useHeaderActionsStore };
export type { HeaderAction };
