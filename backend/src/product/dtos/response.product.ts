export class ResponseProductDTO {
  code!: string;
  name!: string;
  ean!: string;
  brand!: string;
  model!: string;
  category!: string;
  description!: string;
  specification!: string;
  image?: string | null;
  cost_price!: number;
  selling_price!: number;
  physical_inventory!: number | null | undefined;
  reserved_inventory!: number | null | undefined;
  separate_inventory!: number | null | undefined;
  available_inventory!: number | null | undefined;
  status!: 'disponivel' | 'estoque_baixo' | 'indisponivel' | null | undefined;
}
