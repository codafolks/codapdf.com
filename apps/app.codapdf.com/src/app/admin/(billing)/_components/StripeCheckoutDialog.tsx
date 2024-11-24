import { StripeCheckout } from "@/app/admin/(billing)/_containers/StripeCheckout";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import type { PlanSubscription } from "@/server/static/plansSubscription";

type StripeCheckoutDialogProps = {
  open: boolean;
  onClose: () => void;
  defaultPlan: PlanSubscription;
  frequency: SubscriptionsFrequency;
};

export const StripeCheckoutDialog = ({ open, onClose, ...rest }: StripeCheckoutDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent
        className="flex max-h-[90%] flex-1 flex-col gap-0 overflow-hidden bg-background p-0 text-foreground md:max-w-[1000px]"
        onClose={onClose}
      >
        <DialogTitle className="inline p-4 font-medium text-xl">
          <span className="text-foreground">Subscription</span>
        </DialogTitle>
        <DialogDescription />
        <DialogClose />

        <div className="flex flex-1 flex-col overflow-hidden overflow-y-auto p-4">
          <StripeCheckout {...rest} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
