import { env } from "@/constants/env.server";
import { logger } from "@/server/utils/logger";
import { createClient } from "redis";

export const getCacheClient = async () => {
  // Create a Redis client.
  const client = createClient({
    url: env.REDIS_URL,
  });

  client.on("error", (e) => {
    logger.child({ module: "getCacheClient" }).warn("Redis client error:", e);
  });
  await client.connect();
  logger.child({ module: "getCacheClient" }).info("Redis client connected.");
  return client;
};
