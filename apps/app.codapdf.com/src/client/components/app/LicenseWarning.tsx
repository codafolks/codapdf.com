"use client";
import { ROUTES } from "@/app/routes";
import { StatusBar } from "@/client/components/app/StatusBar";
import { Button } from "@/client/components/ui/button";
import { useUserLicense } from "@/client/queries/users";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LicenseWarning = () => {
  const { data: license, isFetched } = useUserLicense();
  const pathname = usePathname();
  const isBillingPage = pathname === ROUTES.PRIVATE.ACCOUNT_BILLING.pathname();

  if (license?.isTrial && isFetched) {
    return (
      <StatusBar
        description={`Enjoying PRO features? Your free trial has ${license?.daysLeft ?? 0} days left! Subscribe anytime to keep access after the trial ends.`}
        variant="warning"
        className="sticky top-0 z-10"
        actions={
          !isBillingPage ? (
            <Button size="sm" asChild>
              <Link href={ROUTES.PRIVATE.ACCOUNT_BILLING.pathname()}>Upgrade</Link>
            </Button>
          ) : null
        }
      />
    );
  }
  return null;
};
