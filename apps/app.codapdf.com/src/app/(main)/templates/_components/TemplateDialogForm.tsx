import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { InputController, TextareaController } from "@/components/app/forms";

import { Form } from "@/components/ui/form";

import { useZodForm } from "@/client/utils/useZodForm";
import { type Template, templateOnSelectZodSchema } from "@/server/database/schemas/templates";

type TemplateDialogFormProps = {
  template?: Pick<Template, "name" | "description">;
  isSaving?: boolean;
  open: boolean;
  onSubmit: (temple: Pick<Template, "name" | "description">) => void;
  onCancel: () => void;
};
const TemplateDialogForm = ({ template, open, isSaving, onSubmit, onCancel }: TemplateDialogFormProps) => {
  const form = useZodForm({
    schema: templateOnSelectZodSchema.pick({ name: true, description: true }),
    defaultValues: template ?? {},
  });

  const handleOnCancel = () => {
    form.reset();
    form.setValue("name", template?.name ?? "");
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={handleOnCancel}>
      <DialogContent>
        <DialogTitle>{template ? "Edit" : "Save"} Template</DialogTitle>
        <DialogClose />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <InputController
                type="text"
                placeholder="Template Name"
                name="name"
                label="Template Name"
                control={form.control}
              />
              <TextareaController
                placeholder="Template Description"
                name="description"
                label="Description"
                control={form.control}
              />
            </div>
            <div className="mt-4 flex gap-2 justify-end flex-1">
              <Button variant="destructive" onClick={handleOnCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" submitting={isSaving}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { TemplateDialogForm };
