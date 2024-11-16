import { logger } from "@/server/utils/logger";

//TODO: Implement error capturing service
export const captureException = <T = Error | string>(error: T) => {
  const message = error instanceof Error ? error.message : String(error);
  logger.error(error, message);
};
