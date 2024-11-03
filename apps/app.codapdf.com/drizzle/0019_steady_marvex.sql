ALTER TABLE "api_keys" RENAME TO "apiKeys";--> statement-breakpoint
ALTER TABLE "apiKeys" DROP CONSTRAINT "api_keys_uuid_unique";--> statement-breakpoint
ALTER TABLE "apiKeys" DROP CONSTRAINT "api_keys_name_unique";--> statement-breakpoint
ALTER TABLE "apiKeys" DROP CONSTRAINT "api_keys_apiKey_unique";--> statement-breakpoint
ALTER TABLE "apiKeys" DROP CONSTRAINT "api_keys_name_userId_unique";--> statement-breakpoint
ALTER TABLE "apiKeys" DROP CONSTRAINT "api_keys_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_uuid_unique" UNIQUE("uuid");--> statement-breakpoint
ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_apiKey_unique" UNIQUE("apiKey");--> statement-breakpoint
ALTER TABLE "apiKeys" ADD CONSTRAINT "apiKeys_name_userId_unique" UNIQUE("name","userId");