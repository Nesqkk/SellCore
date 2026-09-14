import { InternalServerErrorException } from '@nestjs/common';

export class CancelingSalesOrderException extends InternalServerErrorException {
  constructor() {
    super('Não foi possível cancelar o Pedido de Venda');
  }
}
