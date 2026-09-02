import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../database/database';
import { productTable } from '../database/schema/product.schema';

/**
 * ProductRepository — Camada de acesso ao banco de dados para Produtos.
 *
 * O Repository é responsável EXCLUSIVAMENTE por executar as queries SQL,
 * sem conter nenhuma lógica de negócio. Isso separa as responsabilidades:
 * o Service decide O QUE fazer, o Repository decide COMO buscar/salvar no banco.
 *
 * Utiliza o Drizzle ORM para escrever as queries de forma tipada em TypeScript.
 */
@Injectable()
export class ProductRepository {
  /**
   * Busca todos os produtos da tabela, sem filtros.
   */
  async findAll() {
    return db.select().from(productTable);
  }

  /**
   * Busca um produto pelo código interno (ex: "0001234").
   * Retorna um array: vazio se não encontrar, com um item se encontrar.
   * O `eq` é o operador de igualdade do Drizzle (equivale ao WHERE código = code).
   */
  async findByCode(code: string) {
    return db.select().from(productTable).where(eq(productTable.code, code));
  }

  /**
   * Insere um novo produto no banco e retorna o registro criado.
   * O `.returning()` faz o PostgreSQL devolver o registro inserido com todos os campos.
   */
  async create(data: typeof productTable.$inferInsert) {
    return db.insert(productTable).values(data).returning();
  }

  /**
   * Atualiza parcialmente um produto identificado pelo código.
   * O `Partial<>` permite enviar apenas os campos que devem ser alterados.
   */
  async update(code: string, data: Partial<typeof productTable.$inferInsert>) {
    return db.update(productTable).set(data).where(eq(productTable.code, code));
  }

  /**
   * Remove um produto do banco pelo código interno.
   */
  async delete(code: string) {
    return db.delete(productTable).where(eq(productTable.code, code));
  }
}
