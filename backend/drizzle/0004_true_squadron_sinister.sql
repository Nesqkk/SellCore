ALTER TABLE "sales_orders" ALTER COLUMN "cancelado_em" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sales_orders" ALTER COLUMN "cancelado_em" DROP NOT NULL;