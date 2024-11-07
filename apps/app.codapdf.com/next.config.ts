import { isProductionEnvironment } from "./src/utils/isProductionEnvironment";
import type { NextConfig } from "next";
type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };
type Config = MappedOmit<NextConfig, "rewrites">;
/**
 * @type {import('next').NextConfig}
 */
const nextConfig: Config = {
  output: "standalone",
  serverExternalPackages: ["pino", "pino-pretty"],
  compiler: {
    removeConsole: {
      exclude: ["error", "info", "warn"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: (process.env.STORAGE_URL_DOMAIN ?? "")?.replace("https://", ""),
        port: "",
      },
    ],
  },
  cacheHandler: isProductionEnvironment ? require.resolve("./cache-handler.mjs") : undefined,
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

export default nextConfig;
