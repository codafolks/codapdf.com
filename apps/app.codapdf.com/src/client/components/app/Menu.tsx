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
  const { label, href, loading, submitting, disabled, onClick } = action;
  if (href) {
    return (
      <Button asChild loading={loading} submitting={submitting} disabled={disabled} variant={!isDropDown ? "default" : "ghost"}>
        <Link href={href} onClick={onClick}>
          {label}
        </Link>
      </Button>
    );
  }
  return (
    <Button onClick={onClick} loading={loading} submitting={submitting} disabled={disabled} variant={!isDropDown ? "default" : "ghost"}>
      {label}
    </Button>
  );
};

const Actions = ({ actions, isDropDown }: { actions: Array<MenuAction>; isDropDown?: boolean }) => {
  const Wrapper = useMemo(() => (isDropDown ? DropdownMenuItem : DropdownMenu), [isDropDown]);
  const count = actions.length;
  return (
    <>
      {actions.map(({ menuItems, ...action }, idx) => (
        <Wrapper key={action.label}>
          <ActionGroup action={action} isDropDown={isDropDown} />
          {isDropDown && idx < count - 1 && <DropdownMenuSeparator />}
          {menuItems && (
            <DropdownMenuContent>
              {menuItems.map((subAction, idxs) => (
                <DropdownMenuItem key={subAction.label}>
                  <ActionGroup action={subAction} isDropDown={isDropDown} />
                  {idxs < menuItems.length - 1 && <DropdownMenuSeparator />}
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
        <DropdownMenuContent className="z-10 flex min-w-[100px] flex-col border" side="left" align="start">
          <Actions actions={actions} isDropDown />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <Actions actions={actions} />;
};
