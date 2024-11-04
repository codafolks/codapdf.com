import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";
type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };
type Config = MappedOmit<NextConfig, "rewrites">;
const nextConfig: Config = {
  output: "standalone",
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.STORAGE_URL_DOMAIN!?.replace("https://", ""),
        port: "",
      },
    ],
  },
  cacheHandler: process.env.NODE_ENV === "production" ? require.resolve("./cache-handler.mjs") : undefined,
  cacheMaxMemorySize: 0, // disable default in-memory caching
  rewrites() {
    return [
      // PRIVATE PAGES
      {
        source: "/templates/sample/:id",
        destination: "/templates/sample",
      },
      {
        source: "/templates/edit/:id",
        destination: "/templates/edit",
      },
      {
        source: "/projects/settings/:id",
        destination: "/projects/settings",
      },
      {
        source: "/settings/billing",
        destination: "/settings",
      },
      // AUTHENTICATION PAGES
      {
        source: "/auth/login",
        destination: "/login",
      },
      {
        source: "/auth/signup",
        destination: "/signup",
      },
      {
        source: "/auth/forgot-password",
        destination: "/forgot-password",
      },
      {
        source: "/auth/reset-password",
        destination: "/reset-password",
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "codapdf",
project: "codapdf-web",
sentryUrl: "https://glitchtip-web-production-5d0b.up.railway.app/",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});