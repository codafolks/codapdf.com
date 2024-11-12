export const isProductionEnvironment =
  !!process.env.APP_DOMAIN?.includes("https://") || process.env.NODE_ENV === "production";
