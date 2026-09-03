import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../database/database';
import { customerTable } from '../database/schema/customer.schema';

@Injectable()
export class CustomerRepository {
  async findAll() {
    return db.select().from(customerTable);
  }

  async findByCpf(cpf: string) {
    return db.select().from(customerTable).where(eq(customerTable.cpf, cpf));
  }

  async create(data: typeof customerTable.$inferInsert) {
    return db.insert(customerTable).values(data).returning();
  }

  async update(cpf: string, data: Partial<typeof customerTable.$inferInsert>) {
    return db.update(customerTable).set(data).where(eq(customerTable.cpf, cpf));
  }

  async delete(cpf: string) {
    return db.delete(customerTable).where(eq(customerTable.cpf, cpf));
  }
}
