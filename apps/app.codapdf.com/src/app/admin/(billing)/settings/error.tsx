"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-gray-500 text-lg">An error occurred </p>
      <Button onClick={() => router.refresh()} className="ml-2">
        Try again
      </Button>
    </div>
  );
};

export default ErrorPage;
