import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { db } from '../database/database';
import { salesOrderTable } from '../database/schema/sales-order.schema';

import { salesItems } from '../database/schema/sales-items.schema';
import { StockRepository } from '../stock/stock.repository';

@Injectable()
export class SalesOrderRepository {
  constructor(private readonly stockRepository: StockRepository) {}
  async createWithItems(
    orderData: typeof salesOrderTable.$inferInsert,
    itemsData: Omit<typeof salesItems.$inferInsert, 'saleId'>[],
  ) {
    return await db.transaction(async (tx) => {
      for (const item of itemsData) {
        await this.stockRepository.reserve(item.productCode, item.quantity);
      }

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
    return await db.transaction(async (tx) => {
      const [salesOrder] = await tx
        .select()
        .from(salesOrderTable)
        .where(
          and(
            eq(salesOrderTable.pvNumber, pvNumber),
            eq(salesOrderTable.pvCheckDigit, pvCheckDigit),
          ),
        );

      if (!salesOrder) {
        return null;
      }

      if (salesOrder.status !== 'PENDENTE') {
        throw new Error('Apenas pedidos pendentes podem ser cancelados.');
      }

      const items = await tx
        .select()
        .from(salesItems)
        .where(eq(salesItems.saleId, salesOrder.id));

      for (const item of items) {
        await this.stockRepository.cancelReservation(
          tx,
          item.productCode,
          item.quantity,
        );
      }

      const [cancelledOrder] = await tx
        .update(salesOrderTable)
        .set({
          status: 'CANCELADO',
          cancelReason: reason,
          cancelledAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(salesOrderTable.id, salesOrder.id))
        .returning();

      return cancelledOrder;
    });
  }

  async findAllSalesOrders() {
    const salesOrders = await db.select().from(salesOrderTable);

    return salesOrders;
  }
}
