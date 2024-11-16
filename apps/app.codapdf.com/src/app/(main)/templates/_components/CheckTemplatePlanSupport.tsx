import { useCheckPlanTemplateSupport } from "@/app/(main)/templates/_hooks/useCheckPlanTemplateSupport";
import { ROUTES } from "@/app/routes";
import { StatusBar } from "@/client/components/app/StatusBar";
import { Button } from "@/client/components/ui/button";
import Link from "next/link";

type CheckTemplatePlanSupportProps = {
  html: string | null;
};
export const CheckTemplatePlanSupport = ({ html }: CheckTemplatePlanSupportProps) => {
  const { message } = useCheckPlanTemplateSupport(html);
  if (message) {
    return (
      <StatusBar
        description={message}
        variant="warning"
        actions={
          <Button size="sm" asChild>
            <Link href={ROUTES.PRIVATE.ACCOUNT_BILLING.pathname()}>Upgrade</Link>
          </Button>
        }
      />
    );
  }

  return null;
};
