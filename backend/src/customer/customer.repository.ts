import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../database/database';
import { customerTable } from '../database/schema/customer.schema';

/**
 * Repository responsável pela interação direta com a tabela 'customer' no banco de dados.
 * Utiliza a instância do Drizzle ORM ('db') para realizar operações de CRUD
 * (Create, Read, Update, Delete) de forma isolada das regras de negócio.
 */
@Injectable()
export class CustomerRepository {
  /**
   * Busca e retorna todos os registros da tabela de clientes.
   */
  async findAll() {
    return db.select().from(customerTable);
  }

  /**
   * Busca um único registro de cliente onde o CPF do banco for igual ao informado.
   * @param cpf CPF para filtrar a busca.
   */
  async findByCpf(cpf: string) {
    return db.select().from(customerTable).where(eq(customerTable.cpf, cpf));
  }

  /**
   * Insere um novo cliente no banco e retorna os dados recém-inseridos.
   * @param data Objeto com os dados do cliente (inferido do schema).
   */
  async create(data: typeof customerTable.$inferInsert) {
    return db.insert(customerTable).values(data).returning();
  }

  /**
   * Atualiza as colunas de um cliente usando seu CPF como filtro.
   * @param cpf CPF do cliente alvo da atualização.
   * @param data Dados parciais que serão substituídos.
   */
  async update(cpf: string, data: Partial<typeof customerTable.$inferInsert>) {
    return db
      .update(customerTable)
      .set(data)
      .where(eq(customerTable.cpf, cpf))
      .returning();
  }

  /**
   * Exclui um cliente da base de dados filtrando pelo CPF.
   * @param cpf CPF do cliente a ser removido.
   */
  async delete(cpf: string) {
    return db
      .delete(customerTable)
      .where(eq(customerTable.cpf, cpf))
      .returning();
  }
}
