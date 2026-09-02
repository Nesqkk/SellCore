import { NotFoundException } from '@nestjs/common';

/**
 * ProductNotFoundException — Lançada quando um produto não é encontrado pelo código.
 *
 * Estende NotFoundException do NestJS, que retorna automaticamente HTTP 404.
 * Usada no Service nos métodos `findByCode` e `delete`.
 */
export class ProductNotFoundException extends NotFoundException {
  constructor() {
    super('Produto não encontrado');
  }
}
