import { IsOptional } from 'class-validator';

/**
 * UpdateProductDTO — Objeto de Transferência de Dados para atualização de produto.
 *
 * Todos os campos são opcionais (@IsOptional), pois uma atualização parcial (PATCH/PUT)
 * permite enviar apenas os campos que precisam ser modificados.
 * Os campos não enviados simplesmente não serão atualizados no banco.
 *
 * Note que `code` e `ean` não estão aqui pois são identificadores únicos
 * e não devem ser alterados após a criação do produto.
 */
export class UpdateProductDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  ean?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  specification?: string;

  @IsOptional()
  image?: string;
}
