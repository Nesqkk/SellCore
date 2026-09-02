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

/**
 * ProductController — Camada de entrada HTTP para Produtos.
 *
 * O Controller é responsável por receber as requisições HTTP, extrair os dados
 * necessários (body, params, query) e repassar ao ProductService para processamento.
 * Ele não contém lógica de negócio.
 *
 * Todas as rotas deste controller são prefixadas com: /api/v1/product
 */
@Controller('api/v1/product')
export class ProductController {
  // O NestJS injeta automaticamente a instância do ProductService aqui
  constructor(private readonly productService: ProductService) {}

  /**
   * POST /api/v1/product
   * Cria um novo produto. Retorna status 201 (Created) em caso de sucesso.
   * O @Body() extrai e valida automaticamente o corpo da requisição com base no CreateProductDTO.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productDto: CreateProductDTO) {
    const product = await this.productService.create(productDto);

    return {
      ...ProductResponse.CREATED,
      data: product,
    };
  }

  /**
   * GET /api/v1/product
   * Retorna todos os produtos cadastrados.
   */
  @Get()
  async findAll() {
    const products = await this.productService.findAll();

    return {
      ...ProductResponse.SUCCESS,
      data: products,
    };
  }

  /**
   * GET /api/v1/product/:code
   * Busca um produto pelo código interno. O @Param('code') extrai o valor da URL.
   * Ex: GET /api/v1/product/0001234
   */
  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const product = await this.productService.findByCode(code);

    return product;
  }

  /**
   * PUT /api/v1/product/:code
   * Atualiza parcialmente um produto pelo código. Retorna status 200 (OK).
   * O UpdateProductDTO permite enviar apenas os campos que deseja atualizar.
   */
  @Put(':code')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('code') code: string,
    @Body() productDto: UpdateProductDTO,
  ) {
    return this.productService.update(code, productDto);
  }

  /**
   * DELETE /api/v1/product/:code
   * Remove um produto pelo código. Retorna status 200 (OK) em caso de sucesso.
   */
  @Delete(':code')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('code') code: string) {
    return this.productService.delete(code);
  }
}
