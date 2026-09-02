import { BadRequestException } from '@nestjs/common';

/**
 * ProductErrorDeletingException — Lançada ao tentar deletar um produto que não existe.
 *
 * Estende BadRequestException do NestJS, que retorna automaticamente HTTP 400.
 * Usada no Service no método `delete` quando o produto não é encontrado.
 */
export class ProductErrorDeletingException extends BadRequestException {
  constructor() {
    super('Erro ao excluir produto');
  }
}
