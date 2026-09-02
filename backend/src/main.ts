import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Função principal que inicializa a aplicação NestJS.
 */
async function bootstrap() {
  // Cria a instância da aplicação baseada no módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Configura um "Pipe" global de validação.
  // Isso intercepta todas as requisições para validar os dados com base nos DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão definidas no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviar propriedades não definidas no DTO
      transform: true, // Transforma os dados recebidos para os tipos corretos definidos no DTO
    }),
  );

  // Inicia o servidor escutando na porta definida no arquivo .env ou 3000 por padrão
  await app.listen(process.env.PORT ?? 3000);
}

// Executa a função de inicialização
void bootstrap();
