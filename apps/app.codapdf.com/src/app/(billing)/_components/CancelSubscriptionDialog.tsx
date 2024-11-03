import { TextareaController } from "@/client/components/app/forms";
import { CheckBoxGroupController } from "@/client/components/app/forms/CheckBoxGroupController";
import { Button } from "@/client/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@/client/components/ui/dialog";
import { useZodForm } from "@/client/utils/useZodForm";
import { z } from "zod";

const schema = z.object({
  reason: z.array(z.string(), { required_error: "Please select a reason" }).nonempty(),
  message: z.string().optional(),
});

type Reason = z.infer<typeof schema>;

type CancelSubscriptionDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: Reason) => void;
  isSubmitting?: boolean;
};

const reasons = [
  {
    label: "Not using the product",
    id: "not-using",
  },
  {
    label: "Too expensive",
    id: "too-expensive",
  },
  {
    label: "Missing features",
    id: "missing-features",
  },
  {
    label: "Other",
    id: "other",
  },
];

export const CancelSubscriptionDialog = ({ open, onClose, onConfirm, isSubmitting }: CancelSubscriptionDialogProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useZodForm({ schema });
  const handleConfirm = handleSubmit((values) => {
    onConfirm(values);
    reset();
  });
  return (
    <Dialog open={open}>
      <DialogContent className="text-foreground bg-background md:min-w-[700px] " onClose={onClose}>
        <DialogTitle>Cancel Subscription</DialogTitle>
        <div>
          <p className="font-semibold">Oh no! We're sad to see you here :(</p>
          <p>Please let us know why you're cancelling your subscription.</p>
        </div>
        {errors.reason && <p className="text-red-500">{errors.reason.message}</p>}
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <CheckBoxGroupController control={control} name="reason" options={reasons} />
          <TextareaController control={control} name="message" label="Additional comments" />
          <fieldset className="flex gap-4 items-center justify-end">
            <Button type="button" onClick={onClose} disabled={isSubmitting}>
              Go back
            </Button>
            <Button type="submit" variant="destructive" submitting={isSubmitting}>
              Confirm Cancellation
            </Button>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
