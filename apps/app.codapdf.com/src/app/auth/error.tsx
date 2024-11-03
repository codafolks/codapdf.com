"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h2>Something went wrong!</h2>
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default ErrorBoundary;
