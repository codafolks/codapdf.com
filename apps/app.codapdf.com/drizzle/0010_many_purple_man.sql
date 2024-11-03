ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'PENDING';--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "license" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "public"."profiles" ALTER COLUMN "license" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."licenses";--> statement-breakpoint
CREATE TYPE "public"."licenses" AS ENUM('HOBBY', 'BASIC', 'PRO', 'ENTERPRISE');--> statement-breakpoint
ALTER TABLE "public"."profiles" ALTER COLUMN "license" SET DATA TYPE "public"."licenses" USING "license"::"public"."licenses";