import { Module } from '@nestjs/common';
import { SalesOrderController } from './sales-order.controller';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderRepository } from './sales-order.repository';
import { ProductModule } from '../product/product.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [ProductModule, StockModule],
  controllers: [SalesOrderController],
  providers: [SalesOrderService, SalesOrderRepository],
})
export class SalesOrderModule {}
