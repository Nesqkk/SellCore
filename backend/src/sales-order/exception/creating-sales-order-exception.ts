import { InternalServerErrorException } from '@nestjs/common';

export class CreatingSalesOrderException extends InternalServerErrorException {
  constructor() {
    super('Erro ao criar Pedido de Venda');
  }
}
