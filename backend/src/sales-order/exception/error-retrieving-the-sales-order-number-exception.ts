import { NotFoundException } from '@nestjs/common';

export class ErrorRetrievingTheSalesOrderNumber extends NotFoundException {
  constructor() {
    super('Não foi encontrado o Pedido de Venda por esse número');
  }
}
