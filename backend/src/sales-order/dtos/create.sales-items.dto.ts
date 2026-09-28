import { IsString, IsNumber, Min } from 'class-validator';

export class CreateSalesItemsDTO {
  @IsString()
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  discount!: number;
}
