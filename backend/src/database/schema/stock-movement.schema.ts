import {
  pgTable,
  integer,
  varchar,
  uuid,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { productTable } from './product.schema';

export const stockMovementType = pgEnum('stock_movement_type', [
  'ENTRADA',
  'SAIDA',
  'RESERVA',
  'CANCELAMENTO_RESERVA',
  'SEPARACAO',
  'DEVOLUCAO',
  'PERDA',
  'AJUSTE',
]);

export const stockBalanceType = pgEnum('stock_balance_type', [
  'FISICO',
  'RESERVADO',
  'SEPARADO',
  'DISPONIVEL',
]);

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: varchar('id_produto')
    .notNull()
    .references(() => productTable.code),
  balanceType: stockBalanceType('tipo_estoque').notNull(),
  type: stockMovementType('tipo').notNull(),
  quantity: integer('quantidade').notNull(),
  previousQuantity: integer('quantidade_anterior').notNull(),
  newQuantity: integer('quantidade_nova').notNull(),
  reason: varchar('motivo', { length: 255 }),
  createdAt: timestamp('criado_em').defaultNow().notNull(),
});
