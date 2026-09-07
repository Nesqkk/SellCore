import {
  IsNotEmpty,
  Length,
  IsEmail,
  IsOptional,
  IsDateString,
  ValidateIf,
  IsPhoneNumber,
  IsPostalCode,
  Matches,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) para a criação de um novo cliente.
 * Utiliza decorators do pacote 'class-validator' para validar o corpo da requisição (payload)
 * automaticamente antes de chegar na Controller ou na Service.
 */
export class CreateCustomerDTO {
  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  @Length(11, 11, { message: 'CPF deve ter 11 números' })
  @Matches(/^\d+$/, { message: 'CPF deve conter apenas números' })
  cpf!: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, {
    message: 'Nome deve conter apenas letras',
  })
  name!: string;

  @IsNotEmpty({ message: 'Data de nascimento não pode ser vazia' })
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birth_date!: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email!: string;

  @IsPhoneNumber('BR', {
    message: 'Telefone deve ser um número de telefone válido',
  })
  @IsNotEmpty({ message: 'Telefone não pode ser vazio' })
  phone!: string;

  @IsPostalCode('BR', { message: 'CEP deve ser um CEP válido' })
  @IsNotEmpty({ message: 'CEP não pode ser vazio' })
  zip_code!: string;

  @IsNotEmpty({ message: 'Rua não pode ser vazia' })
  street!: string;

  @Matches(/^(?:\d+|S\/N)$/, {
    message: 'Número deve conter apenas números ou ser S/N',
  })
  @IsNotEmpty({ message: 'Número não pode ser vazio' })
  number!: string;

  // Validação condicional: Quadra só é obrigatória se o número for "S/N" (Sem Número)
  @ValidateIf((object: CreateCustomerDTO) => object.number === 'S/N')
  @IsNotEmpty({ message: 'Preencha o campo quadra' })
  @Matches(/^\d+$/, { message: 'Quadra deve conter apenas números' })
  block?: string;

  // Validação condicional: Lote só é obrigatório se o número for "S/N" (Sem Número)
  @ValidateIf((object: CreateCustomerDTO) => object.number === 'S/N')
  @IsNotEmpty({ message: 'Preencha o campo lote' })
  @Matches(/^\d+$/, { message: 'Lote deve conter apenas números' })
  lot?: string;

  @IsOptional()
  complement?: string;

  @IsNotEmpty({ message: 'Bairro não pode ser vazio' })
  neighborhood!: string;

  @IsNotEmpty({ message: 'Cidade não pode ser vazia' })
  city!: string;

  @IsNotEmpty({ message: 'Estado não pode ser vazio' })
  state!: string;
}
