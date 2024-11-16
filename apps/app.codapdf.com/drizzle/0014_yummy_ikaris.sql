ALTER TABLE "users" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now();