import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

/**
 * ProductModule — Módulo responsável por toda a lógica de Produtos.
 *
 * Agrupa os três componentes da arquitetura em camadas:
 *  - Controller: recebe as requisições HTTP e devolve as respostas
 *  - Service: contém as regras de negócio (lógica da aplicação)
 *  - Repository: faz as operações diretas no banco de dados (CRUD)
 */
@Module({
  controllers: [ProductController],
  providers: [
    ProductService,    // Lógica de negócio
    ProductRepository, // Acesso ao banco de dados
  ],
})
export class ProductModule {}
