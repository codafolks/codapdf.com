ALTER TABLE "apiMetrics" RENAME COLUMN "createdAt" TO "timestamp";--> statement-breakpoint
ALTER TABLE "apiMetrics" ALTER COLUMN "timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "apiMetrics" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "apiMetrics" DROP COLUMN IF EXISTS "updatedAt";