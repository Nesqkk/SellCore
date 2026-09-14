import { Test, TestingModule } from '@nestjs/testing';
import { SalesOrderService } from './sales-order.service';

describe('SalesOrderService', () => {
  let service: SalesOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesOrderService],
    }).compile();

    service = module.get<SalesOrderService>(SalesOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
