import { HttpStatus } from '@nestjs/common';

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
