import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { SalesOrderService } from './sales-order.service';

import { CreateSalesOrderDTO } from './dtos/create.sales-order.dto';
import { CancelSalesOrderDTO } from './dtos/cancel-sales-order.dto';

import { SalesOrderResponse } from './constants/sales-order.response';

@Controller('api/v1/sales-order')
export class SalesOrderController {
  constructor(private readonly salesOrderService: SalesOrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateSalesOrderDTO) {
    const salesOrder = await this.salesOrderService.create(data);

    return {
      ...SalesOrderResponse.CREATED,
      salesOrder,
    };
  }

  @Patch(':pvNumber/:pvCheckDigit/cancel')
  @HttpCode(HttpStatus.UNPROCESSABLE_ENTITY)
  async cancel(
    @Param('pvNumber', ParseIntPipe) pvNumber: number,
    @Param('pvCheckDigit', ParseIntPipe) pvCheckDigit: number,
    @Body() data: CancelSalesOrderDTO,
  ) {
    const cancelOrder = await this.salesOrderService.cancel(
      pvNumber,
      pvCheckDigit,
      data,
    );

    return {
      ...SalesOrderResponse.CANCEL,
      cancelOrder,
    };
  }
}
