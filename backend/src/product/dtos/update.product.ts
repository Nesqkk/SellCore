import { IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  ean?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  specification?: string;

  @IsOptional()
  image?: string;
}
