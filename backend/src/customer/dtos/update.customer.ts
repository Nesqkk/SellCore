import {
  IsOptional,
  Length,
  Matches,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsPostalCode,
  ValidateIf,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) para a atualização (Update/Patch) de um cliente existente.
 * Semelhante ao CreateCustomerDTO, porém a maioria dos campos é opcional (IsOptional),
 * permitindo que apenas os dados que precisam ser alterados sejam enviados na requisição.
 */
export class UpdateCustomerDTO {
  @IsOptional()
  @Length(11, 11, { message: 'CPF deve ter 11 números' })
  @Matches(/^\d+$/, { message: 'CPF deve conter apenas números' })
  cpf?: string;

  @IsOptional()
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, {
    message: 'Nome deve conter apenas letras',
  })
  name?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birth_date?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('BR', {
    message: 'Telefone deve ser um número de telefone válido',
  })
  phone?: string;

  @IsOptional()
  @IsPostalCode('BR', { message: 'CEP deve ser um CEP válido' })
  zip_code?: string;

  @IsOptional()
  street?: string;

  @Matches(/^(?:\d+|S\/N)$/, {
    message: 'Número deve conter apenas números ou ser S/N',
  })
  @IsOptional()
  number?: string;

  @IsOptional()
  @ValidateIf((object: UpdateCustomerDTO) => object.number === 'S/N')
  block?: string;

  @IsOptional()
  @ValidateIf((object: UpdateCustomerDTO) => object.number === 'S/N')
  lot?: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  neighborhood?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;
}
