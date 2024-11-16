import "./globals.css";
import { cn } from "@/client/lib/utils";
import { ThemeProvider } from "@/client/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { env } from "@/constants/env.server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to <CodaPDF/>",
  description: "A simple PDF generator for your Coda docs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.className)} suppressHydrationWarning>
      {process.env.NODE_ENV === "production" && (
        <Script
          defer
          src="https://analytics.codafolks.com/script.js"
          data-website-id={env.ANALYTICS_ID}
        />
      )}
      <body className={cn("h-screen overflow-hidden bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="coda-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
