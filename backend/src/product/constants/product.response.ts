import { HttpStatus } from '@nestjs/common';

/**
 * ProductResponse — Constantes de respostas padronizadas da API de Produtos.
 *
 * Centraliza as mensagens e códigos de status HTTP retornados pelo Controller.
 * O uso de constantes garante consistência: sempre que uma operação acontece,
 * o cliente recebe exatamente o mesmo formato de resposta.
 *
 * O spread operator `...ProductResponse.CREATED` no Controller mescla este
 * objeto com o campo `data` contendo o resultado da operação.
 */
export const ProductResponse = {
  // Retornado quando um produto é criado com sucesso (HTTP 201)
  CREATED: {
    statusCode: HttpStatus.CREATED,
    code: 'PRODUCT_CREATED',
    message: 'Produto criado com sucesso',
  },

  // Retornado quando uma busca é realizada com sucesso (HTTP 200)
  SUCCESS: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_SUCCESS',
    message: 'Produtos carregados com sucesso',
  },

  // Retornado quando um produto é atualizado com sucesso (HTTP 200)
  UPDATE: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_UPDATE',
    message: 'Produto atualizado com sucesso',
  },

  // Retornado quando um produto é excluído com sucesso (HTTP 200)
  DELETE: {
    statusCode: HttpStatus.OK,
    code: 'PRODUCT_DELETE',
    message: 'Produto excluído com sucesso',
  },
};
