import type { StripePaymentMethod } from "@/client/queries/stripe";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard as CreditCardIcon } from "lucide-react";

interface SavedCardsProps {
  methods: Array<StripePaymentMethod>;
  paymentMethod: StripePaymentMethod | null;
  onSelectPaymentMethod: (paymentMethod: StripePaymentMethod | null) => void;
}

export function SavedCards({ methods, paymentMethod, onSelectPaymentMethod }: Readonly<SavedCardsProps>) {
  const handleSelectPaymentMethod = (id: StripePaymentMethod["id"]) => {
    onSelectPaymentMethod(methods.find((method) => method.id === id) ?? null);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Saved payment methods</h3>
        <Button variant="ghost" size="sm" onClick={() => onSelectPaymentMethod(null)} className="text-sm">
          Use new card
        </Button>
      </div>
      <RadioGroup value={paymentMethod?.id ?? ""} onValueChange={(value) => handleSelectPaymentMethod(value)}>
        {methods.map((method) => (
          <div key={method.id} className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.card?.last4} className="flex flex-1 cursor-pointer items-center space-x-3">
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {method.card?.brand} •••• {method.card?.last4}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                Expires {method.card?.exp_month}/{method.card?.exp_year}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
