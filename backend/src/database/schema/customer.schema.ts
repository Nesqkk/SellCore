import { pgTable, varchar, integer, date } from 'drizzle-orm/pg-core';

export const customerTable = pgTable('customers', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  cpf: varchar('cpf', { length: 11 }).notNull().unique(),
  name: varchar('nome', { length: 100 }).notNull(),
  birth_date: date('data_nascimento').notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  phone: varchar('telefone', { length: 11 }).notNull(),
  zip_code: varchar('cep', { length: 8 }).notNull(),
  street: varchar('rua', { length: 100 }).notNull(),
  number: varchar('numero', { length: 10 }).notNull(),
  block: varchar('quadra', { length: 10 }).notNull(),
  lot: varchar('lote', { length: 10 }).notNull(),
  complement: varchar('complemento', { length: 50 }),
  neighborhood: varchar('bairro', { length: 50 }).notNull(),
  city: varchar('cidade', { length: 50 }).notNull(),
  state: varchar('estado', { length: 2 }).notNull(),
  created_at: date('criado_em').notNull().defaultNow(),
  updated_at: date('atualizado_em').notNull().defaultNow(),
});
