import {
  Controller,
  Body,
  Param,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { StockService } from './stock.service';

import { ReserveStockDTO } from './dtos/reserve-stock.dto';

@Controller('api/v1/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Patch('reserve/:productCode')
  @HttpCode(HttpStatus.OK)
  async reserve(
    @Param('productCode') productCode: string,
    @Body() data: ReserveStockDTO,
  ) {
    const reserve = await this.stockService.reserve(productCode, data.quantity);

    return reserve;
  }
}
