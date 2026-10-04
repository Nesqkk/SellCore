import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateSalesItemsDTO {
  @IsString()
  productCode!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;
}
