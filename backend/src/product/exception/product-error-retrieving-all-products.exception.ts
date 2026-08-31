import { InternalServerErrorException } from '@nestjs/common';

export class ProductErrorRetrievingAllException extends InternalServerErrorException {
  constructor() {
    super('Erro ao carregar produtos');
  }
}
