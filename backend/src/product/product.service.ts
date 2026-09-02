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

/**
 * ProductService — Camada de regras de negócio para Produtos.
 *
 * Esta classe contém toda a lógica da aplicação relacionada a produtos.
 * Ela delega as operações de banco de dados ao ProductRepository e
 * se preocupa apenas com: validações, tratamentos de erro e transformações de dados.
 *
 * O @Injectable() permite que o NestJS gerencie a instância desta classe
 * automaticamente via Injeção de Dependência.
 */
@Injectable()
export class ProductService {
  // O NestJS injeta automaticamente a instância do ProductRepository aqui
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Retorna todos os produtos cadastrados.
   * Lança uma exceção se a query falhar (retornar null/undefined).
   * Mapeia cada produto para o formato de resposta (ResponseProductDTO).
   */
  async findAll(): Promise<ResponseProductDTO[]> {
    const products = await this.productRepository.findAll();

    if (!products) {
      throw new ProductErrorRetrievingAllException();
    }

    return products.map((product) => this.toResponse(product));
  }

  /**
   * Busca um produto pelo código interno.
   * Lança ProductNotFoundException se não houver produto com aquele código.
   */
  async findByCode(code: string) {
    const product = await this.productRepository.findByCode(code);

    if (product.length === 0) {
      throw new ProductNotFoundException();
    }
    return product.map((p) => this.toResponse(p));
  }

  /**
   * Cria um novo produto no banco de dados.
   * A validação dos dados de entrada é feita pelo DTO (CreateProductDTO).
   */
  async create(productDto: CreateProductDTO) {
    const createProduct = await this.productRepository.create(productDto);

    return createProduct;
  }

  /**
   * Atualiza os dados de um produto pelo código.
   * Retorna a constante ProductResponse.UPDATE em caso de sucesso.
   */
  async update(code: string, productDto: UpdateProductDTO) {
    await this.productRepository.update(code, productDto);

    return ProductResponse.UPDATE;
  }

  /**
   * Exclui um produto pelo código.
   * Antes de deletar, verifica se o produto existe para lançar o erro correto.
   * Retorna a constante ProductResponse.DELETE em caso de sucesso.
   */
  async delete(code: string) {
    const deleteProduct = await this.productRepository.findByCode(code);

    if (deleteProduct.length === 0) {
      throw new ProductErrorDeletingException();
    }

    await this.productRepository.delete(code);

    return ProductResponse.DELETE;
  }

  /**
   * Método privado que transforma o objeto retornado pelo banco (schema do Drizzle)
   * no formato de resposta da API (ResponseProductDTO).
   *
   * Isso garante que nunca retornamos campos internos (como `id`) para o cliente.
   */
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
