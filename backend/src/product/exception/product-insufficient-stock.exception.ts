import { ConflictException } from '@nestjs/common';

export class ProductInsufficientStockException extends ConflictException {
  constructor() {
    super('Estoque insuficiente');
  }
}
