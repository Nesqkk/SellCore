import { pgTable, varchar, integer, date } from 'drizzle-orm/pg-core';

/**
 * Definição da tabela 'customers' no banco de dados PostgreSQL usando Drizzle ORM.
 * Este schema é utilizado para gerar as migrations e inferir os tipos TS no restante da aplicação.
 */
export const customerTable = pgTable('customers', {
  // Identificador único (Primary Key) autoincrementado pelo próprio banco
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),

  // Informações pessoais
  cpf: varchar('cpf', { length: 11 }).notNull().unique(), // Único e obrigatório
  name: varchar('nome', { length: 100 }).notNull(),
  birth_date: date('data_nascimento').notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(), // Único para evitar duplicidade de contas
  phone: varchar('telefone', { length: 11 }).notNull(),

  // Endereço
  zip_code: varchar('cep', { length: 8 }).notNull(),
  street: varchar('rua', { length: 100 }).notNull(),
  number: varchar('numero', { length: 10 }).notNull(),
  block: varchar('quadra', { length: 10 }), // Opcional
  lot: varchar('lote', { length: 10 }), // Opcional
  complement: varchar('complemento', { length: 50 }), // Opcional
  neighborhood: varchar('bairro', { length: 50 }).notNull(),
  city: varchar('cidade', { length: 50 }).notNull(),
  state: varchar('estado', { length: 2 }).notNull(), // Ex: 'SP', 'RJ'

  // Controle de auditoria/timestamps
  created_at: date('criado_em').notNull().defaultNow(),
  updated_at: date('atualizado_em').notNull().defaultNow(),
});
