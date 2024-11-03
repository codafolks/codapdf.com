CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
 CREATE TYPE "public"."licenses" AS ENUM('FREE', 'BASIC', 'PRO', 'ENTERPRISE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_intent_status" AS ENUM('SUCCEEDED', 'FAILED', 'PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" text DEFAULT 'None' NOT NULL,
	"priceId" text DEFAULT 'None' NOT NULL,
	"productId" text DEFAULT 'None' NOT NULL,
	"subscriptionId" text DEFAULT 'None' NOT NULL,
	"userId" serial NOT NULL,
	"status" "payment_intent_status" DEFAULT 'PENDING',
	"clientSecret" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "subscriptions_id_unique" UNIQUE("id"),
	CONSTRAINT "subscriptions_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"thumbnail" text,
	"description" text,
	"userId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "templates_id_unique" UNIQUE("id"),
	CONSTRAINT "templates_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "templates_name_unique" UNIQUE("name"),
	CONSTRAINT "templates_name_userId_unique" UNIQUE("name","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"bio" text,
	"firstName" text,
	"lastName" text,
	"license" "licenses" DEFAULT 'FREE',
	"phone" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "profiles_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"name" text DEFAULT '' NOT NULL,
	"password" text,
	"image" text,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templates" ADD CONSTRAINT "templates_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
