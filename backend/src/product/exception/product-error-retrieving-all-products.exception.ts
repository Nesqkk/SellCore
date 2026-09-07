import { InternalServerErrorException } from '@nestjs/common';

/**
 * ProductErrorRetrievingAllException — Lançada quando a busca de todos os produtos falha.
 *
 * Estende InternalServerErrorException do NestJS, que retorna automaticamente HTTP 500.
 * Indica um problema interno no servidor (ex: banco de dados retornou null/undefined).
 * Usada no Service no método `findAll`.
 */
export class ProductErrorRetrievingAllException extends InternalServerErrorException {
  constructor() {
    super('Erro ao carregar produtos');
  }
}
