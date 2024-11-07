"use client";
import { CreateApiKeyDialog } from "@/app/(main)/api-keys/_components/CreateApiKeyDialog";
import { ApiKeysList } from "@/app/(main)/api-keys/_containers/ApiKeysList";
import { useHeaderActions } from "@/client/hooks/useHeaderActions";
import { useState } from "react";

const ApiKeysPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  useHeaderActions([
    {
      label: "Create API Key",
      onClick: () => setOpenDialog(true),
    },
  ]);

  return (
    <div className="grid gap-4 p-4">
      <ApiKeysList />
      <CreateApiKeyDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};
export default ApiKeysPage;
