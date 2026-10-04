import { NotFoundException } from '@nestjs/common';

export class StockProductNotFoundException extends NotFoundException {
  constructor() {
    super('Produto não encontrado');
  }
}
