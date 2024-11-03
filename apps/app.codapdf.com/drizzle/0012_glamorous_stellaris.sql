CREATE TYPE "public"."providers" AS ENUM('github', 'google', 'email');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentications" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"userId" serial NOT NULL,
	"providerId" text NOT NULL,
	"provider" "providers" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "authentications_id_unique" UNIQUE("id"),
	CONSTRAINT "authentications_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT;