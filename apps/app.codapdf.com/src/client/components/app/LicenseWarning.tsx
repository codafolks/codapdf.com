"use client";
import { StatusBar } from "@/client/components/app/StatusBar";
import { useUserLicense } from "@/client/queries/users";

export const LicenseWarning = () => {
  const { data: license, isFetched } = useUserLicense();
  if (!license && isFetched) {
    return (
      <StatusBar
        description="Enjoying PRO features? Your free trial has 14 days left! Subscribe anytime to keep access after the trial ends."
        variant="warning"
        className="sticky top-0 z-10"
      />
    );
  }
  return null;
};
