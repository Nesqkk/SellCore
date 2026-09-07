import { BadRequestException } from '@nestjs/common';

/**
 * Exceção lançada quando ocorre um erro na busca ou atualização de um
 * cliente específico pelo CPF (ex: cliente não encontrado).
 * Retorna um HTTP Status 400 (Bad Request).
 */
export class CustomerErrorLoadingCustomerByCpfException extends BadRequestException {
  constructor() {
    super('Erro ao carregar cliente pelo CPF');
  }
}
