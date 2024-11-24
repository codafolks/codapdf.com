import type { NextConfig } from "next";
type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };
type Config = MappedOmit<NextConfig, "rewrites">;

const nextConfig: Config = {
  output: "standalone",
  serverExternalPackages: ["pino", "pino-pretty"],
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    optimizeServerReact: true,
    nextScriptWorkers: true,
    gzipSize: true,
    staleTimes: {
      dynamic: 60 * 60 * 24, // 24 hours
      static: 60 * 60 * 24, // 24 hours
    },
  },
  compiler: {
    removeConsole: {
      exclude: ["error", "info", "warn"],
    },
  },
  cacheHandler: process.env.NODE_ENV === "production" ? "./cache-handler.mjs" : undefined,
  cacheMaxMemorySize: 0, // disable default in-memory caching
  logging: {
    fetches: {
      fullUrl: true,
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
  rewrites() {
    return [
      // PRIVATE PAGES
      {
        source:"/dashboard",
        destination: `${process.env.APP_DOMAIN}/dashboard`,
      },
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
        destination: `${process.env.APP_DOMAIN}/login`,
      },
      {
        source: "/auth/signup",
        destination: `${process.env.APP_DOMAIN}/signup`,
      },
      {
        source: "/auth/forgot-password",
        destination: `${process.env.APP_DOMAIN}/forgot-password`,
      },
      {
        source: "/auth/reset-password",
        destination: `${process.env.APP_DOMAIN}/reset-password`,
      },
      { source: '/sitemap.xml', destination: '/api/sitemap' },
      { source: '/robots.txt', destination: '/api/robots' }
    ];
  },
};

export default nextConfig;
