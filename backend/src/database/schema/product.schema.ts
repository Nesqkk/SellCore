import {
  pgTable,
  varchar,
  integer,
  text,
  decimal,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const inventoryStatus = pgEnum('inventory_status', [
  'disponivel',
  'estoque_baixo',
  'indisponivel',
]);

export const productTable = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  code: varchar('código', { length: 7 }).notNull().unique(),
  name: varchar('nome', { length: 100 }).notNull(),
  ean: varchar('ean', { length: 13 }).notNull().unique(),
  brand: varchar('marca', { length: 50 }).notNull(),
  model: varchar('modelo', { length: 50 }).notNull(),
  category: varchar('categoria', { length: 50 }).notNull(),
  description: text('descricao').notNull(),
  specification: text('especificacao').notNull(),
  image: varchar('imagem', { length: 255 }),
  cost_price: decimal('preco_custo', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  selling_price: decimal('preco_venda', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  physical_inventory: integer('estoque_fisico').default(0).notNull(),
  reserved_inventory: integer('estoque_reservado').default(0).notNull(),
  separate_inventory: integer('estoque_separado').default(0).notNull(),
  available_inventory: integer('estoque_disponivel').default(0),
  status: inventoryStatus('status').default('disponivel').notNull(),
});
