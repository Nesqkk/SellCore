import { Injectable } from '@nestjs/common';

import { eq } from 'drizzle-orm';

import { db } from '../database/database';

import { stockMovements } from '../database/schema/stock-movement.schema';
import { productTable } from '../database/schema/product.schema';
import { InsufficientStockException } from './exception/insufficient-stock.exception';

type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

@Injectable()
export class StockRepository {
  async findProductByCode(productCode: string) {
    const [product] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.code, productCode));

    return product;
  }

  async reserve(productCode: string, quantity: number) {
    return await db.transaction(async (tx) => {
      return await this.reserveWithTransaction(tx, productCode, quantity);
    });
  }

  async reserveWithTransaction(
    tx: DbTransaction,
    productCode: string,
    quantity: number,
  ) {
    const [product] = await tx
      .select()
      .from(productTable)
      .where(eq(productTable.code, productCode));

    if (!product) {
      return null;
    }

    const previousReserved = product.reserved_inventory;

    const previousAvailable = product.available_inventory ?? 0;

    if (previousAvailable < quantity) {
      throw new InsufficientStockException();
    }

    const newReserved = previousReserved + quantity;

    const newAvailable = previousAvailable - quantity;

    const [updateProduct] = await tx
      .update(productTable)
      .set({
        reserved_inventory: newReserved,
        available_inventory: newAvailable,
      })
      .where(eq(productTable.code, productCode))
      .returning();

    await tx.insert(stockMovements).values({
      productId: productCode,
      balanceType: 'DISPONIVEL',
      type: 'RESERVA',
      quantity,
      previousQuantity: previousAvailable,
      newQuantity: newAvailable,
      reason: 'Reserva de estoque',
    });

    return updateProduct;
  }

  async cancelReservation(
    tx: DbTransaction,
    productCode: string,
    quantity: number,
  ) {
    const [product] = await tx
      .select()
      .from(productTable)
      .where(eq(productTable.code, productCode));

    if (!product) {
      return null;
    }

    const previousReserved = product.reserved_inventory;
    const previousAvailable = product.available_inventory ?? 0;

    if (previousReserved < quantity) {
      throw new Error(
        'Quantidade reservada insuficiente para cancelar a reserva.',
      );
    }

    const newReserved = previousReserved - quantity;
    const newAvailable = previousAvailable + quantity;

    const [updatedProduct] = await tx
      .update(productTable)
      .set({
        reserved_inventory: newReserved,
        available_inventory: newAvailable,
      })
      .where(eq(productTable.code, productCode))
      .returning();

    await tx.insert(stockMovements).values({
      productId: productCode,
      balanceType: 'RESERVADO',
      type: 'CANCELAMENTO_RESERVA',
      quantity,
      previousQuantity: previousReserved,
      newQuantity: newReserved,
      reason: 'Cancelamento da reserva',
    });

    return updatedProduct;
  }
}
