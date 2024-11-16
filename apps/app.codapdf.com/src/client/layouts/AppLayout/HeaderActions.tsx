import type { HeaderAction } from "@/client/stores/useHeaderActionsStore";
import { Menu } from "@/components/app/Menu";

type HeaderActionsActionsProps = {
  actions: Array<HeaderAction>;
};

const HeaderActions = ({ actions }: HeaderActionsActionsProps) => {
  if (actions.length === 0) return null;
  return (
    <div className="mr-0 ml-auto flex items-center gap-2">
      <Menu actions={actions} />
    </div>
  );
};
export { HeaderActions };
