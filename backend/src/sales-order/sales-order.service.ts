import { Injectable } from '@nestjs/common';

import { SalesOrderRepository } from './sales-order.repository';

import { CreateSalesOrderDTO } from './dtos/create.sales-order.dto';
import { CancelSalesOrderDTO } from './dtos/cancel-sales-order.dto';

import { CreatingSalesOrderException } from './exception/creating-sales-order-exception';
import { ErrorRetrievingTheSalesOrderNumber } from './exception/error-retrieving-the-sales-order-number-exception';

import { ProductService } from '../product/product.service';
import { CancelingSalesOrderException } from './exception/canceling-sales-order-exception';
import { ProductNotFoundException } from '../product/exception/product-not-found.exception';

type SalesOrderItemData = {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
};

@Injectable()
export class SalesOrderService {
  constructor(
    private readonly salesOrderRepository: SalesOrderRepository,
    private readonly productService: ProductService,
  ) {}

  async create(data: CreateSalesOrderDTO) {
    // 1. Geração de valores aleatórios
    const pvNumber = Math.floor(100000 + Math.random() * 900000); // 6 dígitos
    const pvCheckDigit = Math.floor(Math.random() * 10); // 1 dígito
    const dac = Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos
    const barcode = `789${Math.floor(100000000 + Math.random() * 900000000)}`; // Simula EAN

    // 2. Valores fixos/default por enquanto
    const companyCode = '01';
    const sellerId = 'VEND-01';

    // 3. Processamento dos itens e cálculo dos totais
    let subtotal = 0;
    let totalDiscount = 0;
    const itemsData: SalesOrderItemData[] = [];

    for (const item of data.items) {
      // O findByCode retorna um array, pegamos o primeiro
      const [product] = await this.productService.findByCode(item.productId);

      if (!product) {
        throw new ProductNotFoundException();
      }

      const unitPrice = product.selling_price;
      const discount = item.discount ?? 0;

      const itemSubtotal = unitPrice * item.quantity - discount;

      subtotal += unitPrice * item.quantity;
      totalDiscount += discount;

      itemsData.push({
        productId: product.code,
        quantity: item.quantity,
        unitPrice: unitPrice,
        discount: discount,
        subtotal: itemSubtotal,
      });
    }

    const total = subtotal - totalDiscount;

    // 4. Salvar o pedido e os itens usando o transaction
    const salesOrder = await this.salesOrderRepository.createWithItems(
      {
        customerId: data.customerId,
        companyCode,
        pvNumber,
        pvCheckDigit,
        dac,
        barcode,
        sellerId,
        subtotal,
        discount: totalDiscount,
        total,
      },
      itemsData,
    );

    if (!salesOrder) {
      throw new CreatingSalesOrderException();
    }

    return salesOrder;
  }

  async findByPvNumber(pvNumber: number, pvCheckDigit: number) {
    const salesOrder = await this.salesOrderRepository.findByPvNumber(
      pvNumber,
      pvCheckDigit,
    );

    if (!salesOrder) {
      throw new ErrorRetrievingTheSalesOrderNumber();
    }

    return salesOrder;
  }

  async cancel(
    pvNumber: number,
    pvCheckDigit: number,
    data: CancelSalesOrderDTO,
  ) {
    const cancelOrder = await this.salesOrderRepository.cancel(
      pvNumber,
      pvCheckDigit,
      data.reason,
    );
    if (!cancelOrder) {
      throw new CancelingSalesOrderException();
    }

    return cancelOrder;
  }
}
