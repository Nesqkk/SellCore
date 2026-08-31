import { BadRequestException } from '@nestjs/common';

export class ProductErrorDeletingException extends BadRequestException {
  constructor() {
    super('Erro ao excluir produto');
  }
}
