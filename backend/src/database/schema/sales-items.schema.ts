import { pgTable, integer, uuid, decimal, varchar } from 'drizzle-orm/pg-core';

import { productTable } from './product.schema';
import { salesOrderTable } from './sales-order.schema';

export const salesItems = pgTable('sales_items', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  saleId: uuid('id_venda')
    .notNull()
    .references(() => salesOrderTable.id),
  productId: varchar('id_produto')
    .notNull()
    .references(() => productTable.code),
  quantity: integer('quantidade').notNull(),
  unitPrice: decimal('preço_unitario', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  discount: decimal('desconto', {
    precision: 10,
    scale: 2,
    mode: 'number',
  })
    .notNull()
    .default(0),
  subtotal: decimal('subtotal', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
});
