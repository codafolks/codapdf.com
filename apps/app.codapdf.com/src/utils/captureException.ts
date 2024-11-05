import { logger } from "@/server/utils/logger";

//TODO: Implement error capturing service
export const captureException = <T = unknown>(error: T) => {
  const context = "captureException";
  const message = error instanceof Error ? error.message : String(error);
  logger.child({ module: "captureException" }).error(`Error in ${context}: ${message}`, error);
};
