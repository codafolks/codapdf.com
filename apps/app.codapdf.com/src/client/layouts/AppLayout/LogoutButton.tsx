"use client";
import { useSignOut } from "@/client/queries/authentication";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useSignOut({
    onSuccess() {
      router.refresh();
    },
  });
  return (
    <Button type="button" onClick={() => logout.mutateAsync()} submitting={logout.isPending} variant="secondary">
      <LogOutIcon size={24} />
      Logout
    </Button>
  );
};
