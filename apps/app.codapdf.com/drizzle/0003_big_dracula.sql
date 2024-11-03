ALTER TABLE "users" ADD COLUMN "uuid" uuid DEFAULT uuid_generate_v4() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_uuid_unique" UNIQUE("uuid");