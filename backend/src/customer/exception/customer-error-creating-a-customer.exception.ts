import { InternalServerErrorException } from '@nestjs/common';

/**
 * Exceção lançada quando ocorre uma falha na criação de um cliente.
 * Retorna um HTTP Status 500 (Internal Server Error).
 */
export class CustomerErrorCreatingACustomerException extends InternalServerErrorException {
  constructor() {
    super('Error ao criar o cliente. Por favor, tente novamente mais tarde.');
  }
}
