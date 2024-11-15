import "./globals.css";
import { cn } from "@/client/lib/utils";
import { ThemeProvider } from "@/client/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

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
      <Head>
        <script
          defer
          src="https://analytics.codafolks.com/script.js"
          data-website-id="cbbb9d83-89d9-4a2c-9aef-2e7cb3543272"
        ></script>
      </Head>
      <body className={cn("h-screen overflow-hidden bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="coda-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
