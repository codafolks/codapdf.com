import { type HeaderAction, useHeaderActionsStore } from "@/client/stores/useHeaderActionsStore";
import { useEffect } from "react";

const useHeaderActions = (actions: Array<HeaderAction>) => {
  const add = useHeaderActionsStore((state) => state.add);
  const clear = useHeaderActionsStore((state) => state.clear);
  useEffect(() => {
    add(actions);
    return () => clear();
  }, [actions, add, clear]);
};

export { useHeaderActions };
