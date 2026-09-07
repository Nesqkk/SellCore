import { BadRequestException } from '@nestjs/common';

/**
 * Exceção lançada quando não é possível carregar a lista de clientes
 * (por exemplo, quando não há registros no banco).
 * Retorna um HTTP Status 400 (Bad Request).
 */
export class CustomerErrorLoadingClientException extends BadRequestException {
  constructor() {
    super('Erro ao carregar cliente');
  }
}
