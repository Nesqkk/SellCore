import { HttpStatus } from '@nestjs/common';

export const SalesOrderResponse = {
  CREATED: {
    statusCode: HttpStatus.CREATED,
    code: 'SALES-ORDER_CREATED',
    message: 'Pedido de venda feito',
  },

  CANCEL: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'SALES-ORDER_CANCEL',
    message: 'Pedido de venda cancelado',
  },
};
