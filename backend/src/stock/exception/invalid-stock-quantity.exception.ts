import { BadRequestException } from '@nestjs/common';

export class InvalidStockQuantityException extends BadRequestException {
  constructor() {
    super('A quantidade deve ser maior que zero');
  }
}
