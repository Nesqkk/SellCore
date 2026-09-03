import {
  IsNotEmpty,
  Length,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  @Length(11, 11, { message: 'CPF deve ter 11 números' })
  cpf!: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  name!: string;

  @IsNotEmpty({ message: 'Data de nascimento não pode ser vazia' })
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birth_date!: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email!: string;

  @IsNotEmpty({ message: 'Telefone não pode ser vazio' })
  phone!: string;

  @IsNotEmpty({ message: 'CEP não pode ser vazio' })
  zip_code!: string;

  @IsNotEmpty({ message: 'Rua não pode ser vazia' })
  street!: string;

  @IsNotEmpty({ message: 'Número não pode ser vazio' })
  number!: string;

  @IsOptional()
  block!: string;

  @IsOptional()
  lot!: string;

  @IsOptional()
  complement?: string;

  @IsNotEmpty({ message: 'Bairro não pode ser vazio' })
  neighborhood!: string;

  @IsNotEmpty({ message: 'Cidade não pode ser vazia' })
  city!: string;

  @IsNotEmpty({ message: 'Estado não pode ser vazio' })
  state!: string;
}
