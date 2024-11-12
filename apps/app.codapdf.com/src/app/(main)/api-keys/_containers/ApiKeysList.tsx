"use client";
import { CreateApiKeyDialog } from "@/app/(main)/api-keys/_components/CreateApiKeyDialog";
import { useHeaderActions } from "@/client/hooks/useHeaderActions";
import { useApiKeys } from "@/client/queries/apiKeys";
import { DataTable } from "@/components/app/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { ApiKey } from "@/server/database/schemas/apiKeys";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { useMemo, useState } from "react";

export const ApiKeysList = () => {
  const { data, isLoading } = useApiKeys();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  useHeaderActions([
    {
      label: "Create API Key",
      onClick: () => setOpenDialog(true),
    },
  ]);

  const columns: Array<ColumnDef<ApiKey>> = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => row.original.name,
      },
      {
        id: "Token",
        header: "token",
        cell: ({ row }) => (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(row.original.apiKey);
              toast({
                title: "Copied",
                description: "API Key copied to clipboard",
                variant: "info",
              });
            }}
          >
            {row.original.apiKey?.slice(0, 20)}...
          </Button>
        ),
      },
      {
        header: "CreatedAt",
        accessorKey: "createdAt",
        cell: ({ row }) => row.original.createdAt && formatDate(row.original.createdAt, "yyyy-MM-dd HH:mm"),
      },
    ],
    [toast],
  );
  return (
    <>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        EmptyState={<div className="p-4 text-center text-foreground">No API keys found</div>}
      />
      <CreateApiKeyDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};
