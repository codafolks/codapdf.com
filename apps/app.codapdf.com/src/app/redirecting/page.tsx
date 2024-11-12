"use client";
import { ROUTES } from "@/app/routes";
import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = ROUTES.PRIVATE.DASHBOARD.pathname();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="min-h-screen animate-[gradient_15s_ease_infinite] bg-[length:400%_400%] bg-gradient-to-br from-background via-o-gray-100 to-gray-200">
        <div className="container mx-auto flex h-screen items-center justify-center px-4">
          <div className="mx-4 w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800">
            <div className="mb-8 flex justify-center space-x-2">
              <div className="h-3 w-3 animate-bounce rounded-full bg-black"></div>
              <div className="h-3 w-3 animate-bounce rounded-full bg-gray-500"></div>
              <div className="h-3 w-3 animate-bounce rounded-full bg-black"></div>
            </div>
            <div className="relative mb-8 flex justify-center">
              <div className="absolute h-16 w-16 animate-ping-slow rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Arrow Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <h1 className="mb-2 text-center font-bold text-2xl text-gray-800 dark:text-white">
              Redirecting to the {"<CodaPDF  />"}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300">Please wait a moment...</p>
          </div>
        </div>
      </div>
    </>
  );
}
