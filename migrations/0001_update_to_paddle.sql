-- Migration to replace Stripe fields with Paddle fields
-- This migration renames the existing Stripe columns to Paddle columns

-- Rename columns from Stripe to Paddle
ALTER TABLE "organization" RENAME COLUMN "stripe_customer_id" TO "paddle_customer_id";
ALTER TABLE "organization" RENAME COLUMN "stripe_subscription_id" TO "paddle_subscription_id";
ALTER TABLE "organization" RENAME COLUMN "stripe_subscription_price_id" TO "paddle_subscription_price_id";
ALTER TABLE "organization" RENAME COLUMN "stripe_subscription_status" TO "paddle_subscription_status";
ALTER TABLE "organization" RENAME COLUMN "stripe_subscription_current_period_end" TO "paddle_subscription_current_period_end";

-- Drop the old unique index
DROP INDEX IF EXISTS "stripe_customer_id_idx";

-- Create new unique index for Paddle customer ID
CREATE UNIQUE INDEX IF NOT EXISTS "paddle_customer_id_idx" ON "organization" USING btree ("paddle_customer_id");
