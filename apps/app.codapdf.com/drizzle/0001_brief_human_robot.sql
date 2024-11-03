CREATE TABLE IF NOT EXISTS "api_keys" (
	"uuid" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"userId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "api_keys_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "api_keys_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
