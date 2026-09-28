import { Module } from '@nestjs/common';
import { SalesOrderController } from './sales-order.controller';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderRepository } from './sales-order.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [SalesOrderController],
  providers: [SalesOrderService, SalesOrderRepository],
})
export class SalesOrderModule {}
