import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @Length(7, 7, { message: 'O código deve ter 7 números ' })
  @IsNotEmpty({ message: 'Código do produto não pode ser vazio' })
  code!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @MaxLength(100, { message: 'Você passou o máximo de caracteres' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(13, 13, { message: 'O EAN do produto deve ter 13 números ' })
  ean!: string;

  @IsString()
  @IsNotEmpty({ message: 'Preencha o nome da marca' })
  brand!: string;

  @IsString()
  @IsNotEmpty({ message: 'Preencha o campo modelo' })
  model!: string;

  @IsString()
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
  image?: string;

  @IsNumber()
  cost_price!: number;

  @IsNumber()
  selling_price!: number;

  @IsNumber()
  physical_inventory!: number;

  @IsNumber()
  reserved_inventory!: number;

  @IsNumber()
  separate_inventory!: number;

  @IsNumber()
  available_inventory!: number;
}
