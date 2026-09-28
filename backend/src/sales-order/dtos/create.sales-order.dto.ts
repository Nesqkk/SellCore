import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSalesItemsDTO } from './create.sales-items.dto';

export class CreateSalesOrderDTO {
  @IsString()
  customerId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesItemsDTO)
  items!: CreateSalesItemsDTO[];
}
