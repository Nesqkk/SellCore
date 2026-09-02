import {
  pgTable,
  varchar,
  integer,
  text,
  decimal,
  pgEnum,
} from 'drizzle-orm/pg-core';

/**
 * Enum do status de estoque do produto.
 *
 * No PostgreSQL, um ENUM é um tipo de dado que só aceita valores pré-definidos.
 * Aqui definimos os três estados possíveis de estoque de um produto.
 * O Drizzle cria/sincroniza esse tipo no banco com o nome 'inventory_status'.
 */
export const inventoryStatus = pgEnum('inventory_status', [
  'disponivel',    // Produto com estoque suficiente
  'estoque_baixo', // Produto com pouco estoque
  'indisponivel',  // Produto sem estoque
]);

/**
 * Schema da tabela 'products' no banco de dados PostgreSQL.
 *
 * O Drizzle ORM usa este objeto para:
 *  1. Gerar as migrations (estrutura da tabela no banco)
 *  2. Fazer as queries de forma tipada (ex: db.select().from(productTable))
 *  3. Inferir os tipos TypeScript automaticamente via `typeof productTable.$inferInsert`
 */
export const productTable = pgTable('products', {
  // Chave primária auto-incrementada pelo banco (nunca informada manualmente)
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),

  // Código interno único do produto (ex: "0001234") - máx 7 caracteres
  code: varchar('código', { length: 7 }).notNull().unique(),

  // Nome comercial do produto
  name: varchar('nome', { length: 100 }).notNull(),

  // Código de barras EAN-13 único (padrão internacional de 13 dígitos)
  ean: varchar('ean', { length: 13 }).notNull().unique(),

  brand: varchar('marca', { length: 50 }).notNull(),
  model: varchar('modelo', { length: 50 }).notNull(),
  category: varchar('categoria', { length: 50 }).notNull(),

  // Texto longo para descrição e ficha técnica do produto
  description: text('descricao').notNull(),
  specification: text('especificacao').notNull(),

  // URL da imagem do produto (opcional)
  image: varchar('imagem', { length: 255 }),

  // Preços com 2 casas decimais (precision=10 dígitos no total, scale=2 decimais)
  cost_price: decimal('preco_custo', {
    precision: 10,
    scale: 2,
    mode: 'number', // Retorna como number do JS, não como string
  }).notNull(),
  selling_price: decimal('preco_venda', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),

  // Controle de estoque separado em três camadas:
  physical_inventory: integer('estoque_fisico').default(0).notNull(),   // Quantidade física total no depósito
  reserved_inventory: integer('estoque_reservado').default(0).notNull(), // Quantidade reservada para pedidos
  separate_inventory: integer('estoque_separado').default(0).notNull(),  // Quantidade já separada para entrega
  available_inventory: integer('estoque_disponivel').default(0),         // Quantidade disponível para venda

  // Status calculado com base nas quantidades de estoque
  status: inventoryStatus('status').default('disponivel').notNull(),
});
