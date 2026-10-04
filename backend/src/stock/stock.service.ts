import { Injectable } from '@nestjs/common';

import { StockRepository } from './stock.repository';

import { InsufficientStockException } from './exception/insufficient-stock.exception';
import { StockProductNotFoundException } from './exception/product-not-found.exception';
import { InvalidStockQuantityException } from './exception/invalid-stock-quantity.exception';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async reserve(productCode: string, quantity: number) {
    const product = await this.stockRepository.findProductByCode(productCode);

    if (quantity <= 0) {
      throw new InvalidStockQuantityException();
    }

    if (!product) {
      throw new StockProductNotFoundException();
    }

    const availableInventory = product.available_inventory ?? 0;

    if (availableInventory < quantity) {
      throw new InsufficientStockException();
    }

    const reserve = await this.stockRepository.reserve(productCode, quantity);

    return reserve;
  }
}
