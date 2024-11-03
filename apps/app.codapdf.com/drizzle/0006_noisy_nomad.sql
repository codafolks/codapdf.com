ALTER TYPE "public"."payment_intent_status" ADD VALUE 'CANCELED';--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET NOT NULL;