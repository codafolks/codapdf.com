ALTER TABLE "apiMetrics" RENAME COLUMN "response_time_ms" TO "responseTimeMs";--> statement-breakpoint
ALTER TABLE "apiMetrics" RENAME COLUMN "status_code" TO "statusCode";--> statement-breakpoint
ALTER TABLE "apiMetrics" RENAME COLUMN "data_transferred_bytes" TO "dataTransferredBytes";