export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV === "production") {
    const { registerInitialCache } = await import("@neshca/cache-handler/instrumentation");
    // CommonJS CacheHandler configuration is also supported.
    const CacheHandler = (await import("./cache-handler.mjs")).default;
    await registerInitialCache(CacheHandler);
  }
}
