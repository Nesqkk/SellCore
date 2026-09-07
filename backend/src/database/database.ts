import 'dotenv/config'; // Garante que o .env seja carregado antes de qualquer coisa
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

/**
 * Pool de conexões com o banco de dados PostgreSQL.
 *
 * Um "Pool" gerencia múltiplas conexões simultâneas ao banco de dados,
 * reutilizando conexões já abertas em vez de criar uma nova a cada query.
 * Isso é muito mais eficiente e performático.
 *
 * A URL de conexão é lida da variável de ambiente DATABASE_URL do .env
 * no formato: postgresql://usuario:senha@host:porta/nome_do_banco
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Instância principal do Drizzle ORM, configurada com o pool de conexões.
 *
 * Drizzle é o ORM (Object-Relational Mapper) utilizado neste projeto.
 * Ele permite escrever queries SQL de forma tipada e segura em TypeScript.
 * Esta instância `db` é importada diretamente pelo ProductRepository para
 * fazer as operações no banco.
 */
export const db = drizzle(pool);
