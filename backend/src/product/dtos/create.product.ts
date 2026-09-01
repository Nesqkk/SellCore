import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @Length(7, 7, { message: 'Código deve ter 7 números' })
  @IsNotEmpty({ message: 'Código do produto não pode ser vazio' })
  code!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  name!: string;

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

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'URL da imagem não pode ter mais de 255 caracteres',
  })
  image?: string;

  @IsNumber()
  @Min(0)
  cost_price!: number;

  @IsNumber()
  @Min(0)
  selling_price!: number;

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
