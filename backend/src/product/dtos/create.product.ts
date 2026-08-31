import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @Length(7, 7)
  @IsNotEmpty({ message: 'Código do produto não pode ser vazio' })
  code!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsNotEmpty({ message: 'Você passou o máximo de caracteres' })
  name!: string;

  @IsString()
  @Length(13, 13)
  @IsNotEmpty()
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
  @Min(0)
  cost_price!: number;

  @IsNumber()
  @Min(0)
  selling_price!: number;

  @IsNumber()
  @Min(0)
  physical_inventory!: number;

  @IsNumber()
  @Min(0)
  reserved_inventory!: number;

  @IsNumber()
  @Min(0)
  separate_inventory!: number;

  @IsNumber()
  @Min(0)
  available_inventory!: number;
}
