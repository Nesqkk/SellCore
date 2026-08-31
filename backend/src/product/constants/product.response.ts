import { HttpStatus } from '@nestjs/common';

export const ProductResponse = {
  CREATED: {
    statusCode: HttpStatus.CREATED,
    code: 'PRODUCT_CREATED',
    message: 'Produto criado com sucesso',
  },

  SUCCESS: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_SUCCESS',
    message: 'Produtos carregados com sucesso',
  },

  UPDATE: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_UPDATE',
    message: 'Produto atualizado com sucesso',
  },

  DELETE: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_DELETE',
    message: 'Produto excluído com sucesso',
  },
};
