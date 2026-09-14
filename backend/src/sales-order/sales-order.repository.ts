import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { db } from '../database/database';
import { salesOrderTable } from '../database/schema/sales-order.schema';

import { salesItems } from '../database/schema/sales-items.schema';

@Injectable()
export class SalesOrderRepository {
  async createWithItems(
    orderData: typeof salesOrderTable.$inferInsert,
    itemsData: Omit<typeof salesItems.$inferInsert, 'saleId'>[],
  ) {
    return await db.transaction(async (tx) => {
      const [salesOrder] = await tx
        .insert(salesOrderTable)
        .values(orderData)
        .returning();

      if (itemsData.length > 0) {
        const itemsToInsert = itemsData.map((item) => ({
          ...item,
          saleId: salesOrder.id,
        }));
        await tx.insert(salesItems).values(itemsToInsert);
      }

      return salesOrder;
    });
  }

  async findByPvNumber(pvNumber: number, pvCheckDigit: number) {
    const [salesOrder] = await db
      .select()
      .from(salesOrderTable)
      .where(
        and(
          eq(salesOrderTable.pvNumber, pvNumber),
          eq(salesOrderTable.pvCheckDigit, pvCheckDigit),
        ),
      );

    return salesOrder;
  }

  async cancel(pvNumber: number, pvCheckDigit: number, reason: string) {
    const [salesOrder] = await db
      .update(salesOrderTable)
      .set({
        status: 'CANCELADO',
        cancelReason: reason,
        cancelledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(salesOrderTable.pvNumber, pvNumber),
          eq(salesOrderTable.pvCheckDigit, pvCheckDigit),
        ),
      )
      .returning();

    return salesOrder;
  }
}
