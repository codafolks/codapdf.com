import { Menu } from "@/components/app/Menu";
import type { HeaderAction } from "@/client/stores/useHeaderActionsStore";

type HeaderActionsActionsProps = {
  actions: Array<HeaderAction>;
};

const HeaderActions = ({ actions }: HeaderActionsActionsProps) => {
  if (actions.length === 0) return null;
  return (
    <div className="flex gap-2 items-center mr-0 ml-auto">
      <Menu actions={actions} />
    </div>
  );
};
export { HeaderActions };
