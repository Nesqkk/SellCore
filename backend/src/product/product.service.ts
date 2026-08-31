import { Injectable } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dtos/create.product';
import { UpdateProductDTO } from './dtos/update.product';

import { ProductNotFoundException } from './exception/product-not-found.exception';
import { ProductErrorRetrievingAllException } from './exception/product-Error-retrieving-all-products.exception';
import { ProductErrorDeletingException } from './exception/product-error-deleting.exception';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll() {
    const products = await this.productRepository.findAll();

    if (!products) {
      throw new ProductErrorRetrievingAllException();
    }
  }

  async findByCode(code: string) {
    const product = await this.productRepository.findByCode(code);

    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  async create(productDto: CreateProductDTO) {
    const createProduct = await this.productRepository.create(productDto);

    return createProduct;
  }

  async update(code: string, productDto: UpdateProductDTO) {
    const updateProduct = await this.productRepository.update(code, productDto);

    return updateProduct;
  }

  async delete(code: string) {
    const deleteProduct = await this.productRepository.delete(code);

    if (!deleteProduct) {
      throw new ProductErrorDeletingException();
    }

    return deleteProduct;
  }
}
