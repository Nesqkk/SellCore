import { Test, TestingModule } from '@nestjs/testing';
import { SalesOrderController } from './sales-order.controller';

describe('SalesOrderController', () => {
  let controller: SalesOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesOrderController],
    }).compile();

    controller = module.get<SalesOrderController>(SalesOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
