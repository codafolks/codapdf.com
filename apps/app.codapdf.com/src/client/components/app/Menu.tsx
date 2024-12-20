import type { HeaderAction } from "@/client/stores/useHeaderActionsStore";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export type MenuAction = HeaderAction;

type MenuProps = {
  actions: Array<MenuAction>;
  isDropDown?: boolean;
  className?: string;
};

type ActionGroupProps = {
  action: MenuAction;
  isDropDown?: boolean;
};

const ActionGroup = ({ action, isDropDown }: ActionGroupProps) => {
  const { label, href, loading, submitting, disabled, onClick, buttonVariant, size, ...rest } = action;
  if (href) {
    return (
      <Button asChild size={size ?? "sm"} variant={!isDropDown ? (buttonVariant ?? "secondary") : "default"} {...rest}>
        <Link href={href} onClick={onClick}>
          {label}
        </Link>
      </Button>
    );
  }
  return (
    <Button
      onClick={onClick}
      size={size ?? "sm"}
      variant={!isDropDown ? (buttonVariant ?? "secondary") : "default"}
      {...rest}
    >
      {label}
    </Button>
  );
};

const Actions = ({ actions, isDropDown }: { actions: Array<MenuAction>; isDropDown?: boolean }) => {
  const Wrapper = useMemo(() => (isDropDown ? DropdownMenuItem : DropdownMenu), [isDropDown]);
  return (
    <>
      {actions.map(({ menuItems, ...action }) => (
        <Wrapper key={action.label}>
          <ActionGroup action={action} isDropDown={isDropDown} />
          {menuItems && (
            <DropdownMenuContent>
              {menuItems.map((subAction, idx) => (
                <DropdownMenuItem key={subAction.label}>
                  <ActionGroup action={subAction} isDropDown={isDropDown} />
                  {idx < menuItems.length - 1 && <DropdownMenuSeparator />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </Wrapper>
      ))}
    </>
  );
};

export const Menu = ({ actions, isDropDown, className }: MenuProps) => {
  if (!actions.length) return null;
  if (isDropDown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-10 flex min-w-[100px] flex-col border bg-background text-foreground"
          side="left"
          align="start"
        >
          <Actions actions={actions} isDropDown />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <Actions actions={actions} />;
};
