CREATE TABLE IF NOT EXISTS "apiMetrics" (
	"uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"userId" serial NOT NULL,
	"apiKey" text NOT NULL,
	"endpoint" text NOT NULL,
	"response_time_ms" serial NOT NULL,
	"status_code" serial NOT NULL,
	"data_transferred_bytes" serial NOT NULL,
	"error" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "apiMetrics_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "apiMetrics" ADD CONSTRAINT "apiMetrics_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
