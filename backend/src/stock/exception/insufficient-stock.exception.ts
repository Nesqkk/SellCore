import { BadRequestException } from '@nestjs/common';

export class InsufficientStockException extends BadRequestException {
  constructor() {
    super('Estoque insuficiente para realizar a reserva');
  }
}
