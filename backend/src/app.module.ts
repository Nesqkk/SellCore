import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

/**
 * AppModule — Módulo raiz da aplicação.
 *
 * Todo módulo NestJS funciona como um "bloco" que agrupa controllers,
 * services e outros módulos relacionados. O AppModule é o ponto central
 * que importa e conecta todos os outros módulos.
 */
@Module({
  imports: [
    // Carrega as variáveis de ambiente do arquivo .env e as disponibiliza
    // globalmente em toda a aplicação via process.env
    ConfigModule.forRoot({
      isGlobal: true, // Não é necessário re-importar em outros módulos
    }),

    // Módulo responsável pelas funcionalidades de Produto (CRUD)
    ProductModule,

    // Módulo responsável pela configuração e conexão com o banco de dados
    DatabaseModule,
  ],
})
export class AppModule {}
