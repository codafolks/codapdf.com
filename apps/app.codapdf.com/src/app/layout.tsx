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
  title: "Effortless HTML to PDF Conversion | \<CodaPDF/>",
  description: "Convert your HTML templates into high-quality PDFs quickly and easily with \<CodaPDF/>. Enjoy seamless online conversion with just a few clicks—no installations required.",
  openGraph: {
    title: "Effortless HTML to PDF Conversion | \<CodaPDF/>",
    description: "Convert your HTML templates into high-quality PDFs quickly and easily with \<CodaPDF/>. Enjoy seamless online conversion with just a few clicks—no installations required.",
    type: "website",
    url: env.SITE_DOMAIN,
    images: [
      {
        url: `${env.SITE_DOMAIN}/og-image.png`,
        width: 1200,
        height: 574,
        alt: "CodaPDF",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.className)} suppressHydrationWarning>
      {process.env.NODE_ENV === "production" && (
        <Script defer src="https://analytics.codafolks.com/script.js" data-website-id={env.ANALYTICS_ID} />
      )}
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}`}
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.GOOGLE_ANALYTICS_ID}');
        `}
          </Script>
        </>
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
