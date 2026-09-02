import { Global, Module } from '@nestjs/common';

/**
 * DatabaseModule — Módulo global de banco de dados.
 *
 * O decorator @Global() faz com que este módulo seja visível em toda a
 * aplicação sem precisar ser importado manualmente em cada módulo.
 *
 * Por enquanto ele não exporta providers pois a conexão `db` é instanciada
 * diretamente no arquivo `database.ts` e importada onde necessário.
 * No futuro, se a conexão for gerenciada via injeção de dependência do Nest,
 * os providers seriam declarados e exportados aqui.
 */
@Global()
@Module({})
export class DatabaseModule {}
