import { InputController } from "@/components/app/forms";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useApiKeys, useApiKeysCreate } from "@/client/queries/apiKeys";
import { apiKeyZodCreateSchema } from "@/server/database/schemas/apiKeys";
import { useZodForm } from "@/client/utils/useZodForm";

type CreateApiKeyDialogProps = {
  open: boolean;
  onClose: () => void;
};
export const CreateApiKeyDialog = ({ open, onClose }: CreateApiKeyDialogProps) => {
  const { toast } = useToast();
  const keys = useApiKeys(undefined, { enabled: false });
  const create = useApiKeysCreate({
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      keys.refetch();
      toast({
        title: "Success",
        description: "API Key created",
        variant: "info",
      });
      onClose();
    },
  });
  const form = useZodForm({
    schema: apiKeyZodCreateSchema,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await create.mutateAsync(data);
  });

  return (
    <Dialog open={open}>
      <DialogContent onClose={onClose} className="bg-background text-foreground">
        <DialogTitle>Create API Key</DialogTitle>
        <form onSubmit={onSubmit} className="grid gap-4">
          <InputController label="Name" control={form.control} name="name" placeholder="Enter a name for the API key" />
          <fieldset className="flex justify-end">
            <Button type="submit" submitting={create.isPending}>
              Create
            </Button>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
