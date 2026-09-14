import {
  pgTable,
  integer,
  varchar,
  decimal,
  uuid,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { customerTable } from './customer.schema';

export const saleStatus = pgEnum('sale_status', [
  'PENDENTE',
  'RESERVADO',
  'AGUARDANDO_SEPARACAO',
  'EM SEPARACAO',
  'SEPARADO',
  'CONCLUIDO',
  'CANCELADO',
]);

export const salesOrderTable = pgTable('sales_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyCode: varchar('codigo_empresa', { length: 2 }).notNull(),
  pvNumber: integer('numero_pv').notNull(),
  pvCheckDigit: integer('digito_verificação').notNull(),
  dac: varchar('dac', { length: 4 }).notNull(),
  barcode: varchar('codigo_barras', { length: 100 }).notNull().unique(),
  sellerId: varchar('id_vendedor').notNull(),
  customerId: varchar('id_cliente')
    .notNull()
    .references(() => customerTable.cpf),
  status: saleStatus('status').notNull().default('PENDENTE'),
  subtotal: decimal('subtotal', {
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
  total: decimal('total', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  cancelReason: varchar('motivo_cancelamento', { length: 255 }),
  createdAt: timestamp('criado_em', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('atualizado_em', { withTimezone: true })
    .notNull()
    .defaultNow(),
  cancelledAt: timestamp('cancelado_em', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
