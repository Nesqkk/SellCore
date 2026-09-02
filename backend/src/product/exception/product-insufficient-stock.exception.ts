import { ConflictException } from '@nestjs/common';

/**
 * ProductInsufficientStockException — Lançada quando não há estoque suficiente.
 *
 * Estende ConflictException do NestJS, que retorna automaticamente HTTP 409 (Conflict).
 * Preparada para ser usada futuramente em operações que validem o estoque disponível
 * antes de reservar ou separar produtos (ex: ao criar um pedido).
 */
export class ProductInsufficientStockException extends ConflictException {
  constructor() {
    super('Estoque insuficiente');
  }
}
