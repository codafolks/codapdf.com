CREATE TYPE "public"."product_nickname" AS ENUM('hobby', 'basic', 'pro', 'enterprise');--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "priceAmount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "productNickname" "product_nickname" NOT NULL;