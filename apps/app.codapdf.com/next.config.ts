import type { NextConfig } from "next";
type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };
type Config = MappedOmit<NextConfig, "rewrites" | "redirects">;


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
  redirects() {
    return [
      {
        source: '/auth/:path*',
        has: [
          {
            type: 'host',
            value: process.env.SITE_DOMAIN?.replace('https://', '')?.replace('http://', ''),
          },
        ],
        destination: `${process.env.APP_DOMAIN}/:path*`,
        permanent: true,
      },
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: process.env.SITE_DOMAIN?.replace('https://', '')?.replace('http://', ''),
          },
        ],
        destination: `${process.env.APP_DOMAIN}/:path*`,
        permanent: true,
      },
      {
        source: '/', // Match all paths
        has: [
          {
            type: 'host',
            value: process.env.APP_DOMAIN?.replace('https://', '')?.replace('http://', ''),
          },
        ],
        destination: `${process.env.SITE_DOMAIN}/`, // Redirect to 'domain.com' with the same path
        permanent: true, // Use a 308 permanent redirect
      },
      {
        source: '/docs', // Match all paths
        has: [
          {
            type: 'host',
            value: process.env.APP_DOMAIN?.replace('https://', '')?.replace('http://', ''),
          },
          {
            type: 'host',
            value: process.env.SITE_DOMAIN?.replace('https://', '')?.replace('http://', ''),
          },
        ],
        destination: `${process.env.DOCS_DOMAIN}/docs`, // Redirect to 'domain.com' with the same path
        permanent: true, // Use a 308 permanent redirect
      },
    ]
  },
  rewrites() {
    return [
      // PRIVATE
      {
        source: '/dashboard',
        destination: "/admin/dashboard",
      },
      {
        source: '/templates',
        destination: "/admin/templates",
      },
      {
        source: '/templates/create',
        destination: "/admin/templates/create",
      },
      {
        source: "/templates/sample/:id",
        destination: "/admin/templates/sample",
      },
      {
        source: "/templates/edit/:id",
        destination: "/admin/templates/edit",
      },
      {
        source: "/projects/settings/:id",
        destination: "/admin/projects/settings",
      },
      {
        source: "/settings/billing",
        destination: "/admin/settings",
      },
      {
        source: "/api-keys",
        destination: "/admin/api-keys",
      },
      {
        source: "/settings/account",
        destination: "/admin/settings/account",
      },
      // AUTH
      {
        source: '/login',
        destination: "/auth/login",
      },
      {
        source: '/signup',
        destination: "/auth/signup",
      },
      {
        source: '/forgot-password',
        destination: "/auth/forgot-password",
      },
      {
        source: '/reset-password',
        destination: "/auth/reset-password",
      },
      { source: '/sitemap.xml', destination: '/api/sitemap' },
    ];
  },
};

export default nextConfig;
