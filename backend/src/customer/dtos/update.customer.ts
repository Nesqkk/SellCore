import { IsOptional } from 'class-validator';

export class CustomerUpdateDTO {
  @IsOptional()
  cpf!: string;

  @IsOptional()
  name!: string;

  @IsOptional()
  birth_date!: string;

  @IsOptional()
  email!: string;

  @IsOptional()
  phone!: string;

  @IsOptional()
  zip_code!: string;

  @IsOptional()
  street!: string;

  @IsOptional()
  number!: string;

  @IsOptional()
  block!: string;

  @IsOptional()
  lot!: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  neighborhood!: string;

  @IsOptional()
  city!: string;

  @IsOptional()
  state!: string;
}
