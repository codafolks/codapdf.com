"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-lg text-gray-500">An error occurred </p>
      <Button onClick={() => router.refresh()} className="ml-2">
        Try again
      </Button>
    </div>
  );
};

export default ErrorPage;
