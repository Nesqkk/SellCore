import { ConflictException } from '@nestjs/common';

/**
 * ProductAlreadyExistsException — Lançada ao tentar criar um produto com código ou EAN já existente.
 *
 * Estende ConflictException do NestJS, que retorna automaticamente HTTP 409 (Conflict).
 * Indica que o recurso já existe no banco de dados (violação de unique constraint).
 */
export class ProductAlreadyExistsException extends ConflictException {
  constructor() {
    super('Produto já existente');
  }
}
