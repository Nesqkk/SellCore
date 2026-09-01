CREATE TYPE "public"."inventory_status" AS ENUM('disponivel', 'estoque_baixo', 'indisponivel');--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"código" varchar(7) NOT NULL,
	"nome" varchar(100) NOT NULL,
	"ean" varchar(13) NOT NULL,
	"marca" varchar(50) NOT NULL,
	"modelo" varchar(50) NOT NULL,
	"categoria" varchar(50) NOT NULL,
	"descricao" text NOT NULL,
	"especificacao" text NOT NULL,
	"imagem" varchar(255),
	"preco_custo" numeric(10, 2) NOT NULL,
	"preco_venda" numeric(10, 2) NOT NULL,
	"estoque_fisico" integer DEFAULT 0 NOT NULL,
	"estoque_reservado" integer DEFAULT 0 NOT NULL,
	"estoque_separado" integer DEFAULT 0 NOT NULL,
	"estoque_disponivel" integer DEFAULT 0,
	"status" "inventory_status" DEFAULT 'disponivel' NOT NULL,
	CONSTRAINT "products_código_unique" UNIQUE("código"),
	CONSTRAINT "products_ean_unique" UNIQUE("ean")
);
