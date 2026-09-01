import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../database/database';
import { productTable } from '../database/schema/product.schema';

@Injectable()
export class ProductRepository {
  async findAll() {
    return db.select().from(productTable);
  }

  async findByCode(code: string) {
    return db.select().from(productTable).where(eq(productTable.code, code));
  }

  async create(data: typeof productTable.$inferInsert) {
    return db.insert(productTable).values(data).returning();
  }

  async update(code: string, data: Partial<typeof productTable.$inferInsert>) {
    return db.update(productTable).set(data).where(eq(productTable.code, code));
  }

  async delete(code: string) {
    return db.delete(productTable).where(eq(productTable.code, code));
  }
}
