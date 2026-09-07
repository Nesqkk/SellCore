import { InternalServerErrorException } from '@nestjs/common';

/**
 * Exceção lançada quando ocorre uma falha ao tentar deletar um cliente.
 * Retorna um HTTP Status 500 (Internal Server Error).
 */
export class CustomerErrorDeletingCustomerException extends InternalServerErrorException {
  constructor() {
    super('Error ao deletar o cliente. Por favor, tente novamente mais tarde.');
  }
}
