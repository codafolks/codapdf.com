import { StripeCheckout } from "@/app/(billing)/_containers/StripeCheckout";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { PlanSubscription } from "@/server/static/plansSubscription";

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
        className="md:max-w-[1000px] max-h-[90%] flex flex-col flex-1 overflow-hidden gap-0 text-foreground bg-background p-0"
        onClose={onClose}
      >
        <DialogTitle className="font-medium text-xl p-4 inline">
          <span className="text-foreground">Subscription</span>
        </DialogTitle>
        <DialogClose />
        <div className="flex flex-1 flex-col overflow-y-auto overflow-hidden p-4">
          <StripeCheckout {...rest} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
