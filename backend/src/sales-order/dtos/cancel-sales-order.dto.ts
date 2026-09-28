import { IsString, Length } from 'class-validator';

export class CancelSalesOrderDTO {
  @IsString()
  @Length(5, 255, { message: 'Você ultrapassou o máximo de caracteres' })
  reason!: string;
}
