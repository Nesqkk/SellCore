import { Injectable } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dtos/create.product';
import { UpdateProductDTO } from './dtos/update.product';
import { ResponseProductDTO } from './dtos/response.product';

import { ProductNotFoundException } from './exception/product-not-found.exception';
import { ProductErrorRetrievingAllException } from './exception/product-error-retrieving-all-products.exception';
import { ProductErrorDeletingException } from './exception/product-error-deleting.exception';

import { productTable } from '../database/schema/product.schema';
import { ProductResponse } from './constants/product.response';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ResponseProductDTO[]> {
    const products = await this.productRepository.findAll();

    if (!products) {
      throw new ProductErrorRetrievingAllException();
    }

    return products.map((product) => this.toResponse(product));
  }

  async findByCode(code: string) {
    const product = await this.productRepository.findByCode(code);

    if (product.length === 0) {
      throw new ProductNotFoundException();
    }
    return product.map((p) => this.toResponse(p));
  }

  async create(productDto: CreateProductDTO) {
    const createProduct = await this.productRepository.create(productDto);

    return createProduct;
  }

  async update(code: string, productDto: UpdateProductDTO) {
    await this.productRepository.update(code, productDto);

    return ProductResponse.UPDATE;
  }

  async delete(code: string) {
    const deleteProduct = await this.productRepository.findByCode(code);

    if (deleteProduct.length === 0) {
      throw new ProductErrorDeletingException();
    }

    await this.productRepository.delete(code);

    return ProductResponse.DELETE;
  }

  private toResponse(
    product: typeof productTable.$inferInsert,
  ): ResponseProductDTO {
    return {
      code: product.code,
      name: product.name,
      ean: product.ean,
      brand: product.brand,
      model: product.model,
      category: product.category,
      description: product.description,
      specification: product.specification,
      image: product.image,
      cost_price: product.cost_price,
      selling_price: product.selling_price,
      physical_inventory: product.physical_inventory,
      reserved_inventory: product.reserved_inventory,
      separate_inventory: product.separate_inventory,
      available_inventory: product.available_inventory,
      status: product.status,
    };
  }
}
