CREATE TYPE "public"."sale_status" AS ENUM('PENDENTE', 'RESERVADO', 'AGUARDANDO_SEPARACAO', 'EM SEPARACAO', 'SEPARADO', 'CONCLUIDO', 'CANCELADO');--> statement-breakpoint
CREATE TYPE "public"."stock_balance_type" AS ENUM('FISICO', 'RESERVADO', 'SEPARADO', 'DISPONIVEL');--> statement-breakpoint
CREATE TYPE "public"."stock_movement_type" AS ENUM('ENTRADA', 'SAIDA', 'RESERVA', 'CANCELAMENTO_RESERVA', 'SEPARACAO', 'DEVOLUCAO', 'PERDA', 'AJUSTE');--> statement-breakpoint
CREATE TABLE "sales_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sales_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_venda" uuid NOT NULL,
	"id_produto" varchar NOT NULL,
	"quantidade" integer NOT NULL,
	"preço_unitario" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT 0 NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"codigo_empresa" varchar(2) NOT NULL,
	"numero_pv" integer NOT NULL,
	"digito_verificação" integer NOT NULL,
	"dac" varchar(4) NOT NULL,
	"codigo_barras" varchar(100) NOT NULL,
	"id_vendedor" varchar NOT NULL,
	"id_cliente" varchar NOT NULL,
	"status" "sale_status" DEFAULT 'PENDENTE' NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT 0 NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"motivo_cancelamento" varchar(255),
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"cancelado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sales_orders_codigo_barras_unique" UNIQUE("codigo_barras")
);
--> statement-breakpoint
CREATE TABLE "stock_movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_produto" varchar NOT NULL,
	"tipo_estoque" "stock_balance_type" NOT NULL,
	"tipo" "stock_movement_type" NOT NULL,
	"quantidade" integer NOT NULL,
	"quantidade_anterior" integer NOT NULL,
	"quantidade_nova" integer NOT NULL,
	"motivo" varchar(255),
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "estoque_disponivel" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sales_items" ADD CONSTRAINT "sales_items_id_venda_sales_orders_id_fk" FOREIGN KEY ("id_venda") REFERENCES "public"."sales_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales_items" ADD CONSTRAINT "sales_items_id_produto_products_código_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."products"("código") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales_orders" ADD CONSTRAINT "sales_orders_id_cliente_customers_cpf_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."customers"("cpf") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_id_produto_products_código_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."products"("código") ON DELETE no action ON UPDATE no action;