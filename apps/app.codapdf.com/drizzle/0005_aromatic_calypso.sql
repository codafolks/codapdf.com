ALTER TABLE "templates" ALTER COLUMN "filesName" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "customerId";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_customerId_unique" UNIQUE("customerId");