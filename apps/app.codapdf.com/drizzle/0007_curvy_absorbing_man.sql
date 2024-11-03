ALTER TYPE "public"."payment_intent_status" RENAME TO "subscriptions_status";--> statement-breakpoint
ALTER TABLE "public"."subscriptions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."subscriptions_status";--> statement-breakpoint
CREATE TYPE "public"."subscriptions_status" AS ENUM('ACTIVE', 'PENDING', 'CANCELED');--> statement-breakpoint
ALTER TABLE "public"."subscriptions" ALTER COLUMN "status" SET DATA TYPE "public"."subscriptions_status" USING "status"::"public"."subscriptions_status";