import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create.product';
import { UpdateProductDTO } from './dtos/update.product';
import { ProductResponse } from './constants/product.response';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productDto: CreateProductDTO) {
    const product = await this.productService.create(productDto);

    return {
      ...ProductResponse.CREATED,
      data: product,
    };
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();

    return {
      ...ProductResponse.SUCCESS,
      data: products,
    };
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const product = await this.productService.findByCode(code);

    return product;
  }

  @Put(':code')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('code') code: string,
    @Body() productDto: UpdateProductDTO,
  ) {
    return this.productService.update(code, productDto);
  }

  @Delete(':code')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('code') code: string) {
    return this.productService.delete(code);
  }
}
