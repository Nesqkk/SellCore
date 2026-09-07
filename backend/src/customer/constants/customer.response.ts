import { HttpStatus } from '@nestjs/common';

/**
 * Objeto constante que centraliza e padroniza as respostas de sucesso da API de clientes.
 * Facilita a manutenção (mudando a mensagem em um único lugar) e mantém o contrato da API consistente,
 * retornando sempre um código interno, uma mensagem e o HTTP Status apropriado.
 */
export const CustomerResponse = {
  CREATED: {
    statusCode: HttpStatus.CREATED,
    code: 'CUSTOMER_CREATED',
    message: 'Cliente criado com sucesso',
  },

  SUCCESS: {
    statusCode: HttpStatus.OK,
    code: 'CUSTOMER_SUCCESS',
    message: 'Cliente carregado com sucesso',
  },

  UPDATE: {
    statusCode: HttpStatus.OK,
    code: 'CUSTOMER_UPDATE',
    message: 'Cliente atualizado com sucesso',
  },

  DELETE: {
    statusCode: HttpStatus.OK,
    code: 'CUSTOMER_DELETE',
    message: 'Cliente excluído com sucesso',
  },
};
