import pino, { type Logger } from "pino";

const isProd = process.env.APP_DOMAIN?.includes("https://");
export const logger: Logger = isProd
  ? // JSON in production
    pino({ level: "warn" })
  : // Pretty print in development
    pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      level: "debug",
    });
