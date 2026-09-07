import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  MaxLength,
} from 'class-validator';

/**
 * CreateProductDTO — Objeto de Transferência de Dados para criação de produto.
 *
 * DTO (Data Transfer Object) é um objeto que define a "forma" dos dados
 * esperados em uma requisição. O `class-validator` usa os decorators (@IsString,
 * @IsNotEmpty etc.) para validar automaticamente cada campo antes de chegar
 * ao Service. Se a validação falhar, o NestJS retorna um erro 400 Bad Request.
 */
export class CreateProductDTO {
  // Código interno único do produto - exatamente 7 caracteres
  @IsString()
  @Length(7, 7, { message: 'Código deve ter 7 números' })
  @IsNotEmpty({ message: 'Código do produto não pode ser vazio' })
  code!: string;

  // Nome do produto - entre 1 e 100 caracteres
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  name!: string;

  // Código de barras EAN-13 - exatamente 13 dígitos
  @IsString()
  @Length(13, 13, { message: 'EAN deve conter 13 números' })
  @IsNotEmpty()
  ean!: string;

  @IsString()
  @MaxLength(50, { message: 'Marca não pode ter mais de 50 caracteres' })
  @IsNotEmpty({ message: 'Preencha o nome da marca' })
  brand!: string;

  @IsString()
  @MaxLength(50, { message: 'Modelo não pode ter mais de 50 caracteres' })
  @IsNotEmpty({ message: 'Preencha o campo modelo' })
  model!: string;

  @IsString()
  @MaxLength(50, { message: 'Categoria não pode ter mais de 50 caracteres' })
  @IsNotEmpty({ message: 'Preencha o campo categoria' })
  category!: string;

  @IsString()
  @IsNotEmpty({ message: 'Preencha o campo descrição' })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: 'Preencha o campo especificação' })
  specification!: string;

  // URL da imagem é opcional (@IsOptional ignora a validação se o campo não for enviado)
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'URL da imagem não pode ter mais de 255 caracteres',
  })
  image?: string;

  // Preços não podem ser negativos (@Min(0))
  @IsNumber()
  @Min(0)
  cost_price!: number;

  @IsNumber()
  @Min(0)
  selling_price!: number;

  // Campos de estoque são opcionais na criação (padrão é 0 definido no schema)
  @IsOptional()
  @IsNumber()
  @Min(0)
  physical_inventory!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  reserved_inventory!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  separate_inventory!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  available_inventory!: number;
}
