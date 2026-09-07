/**
 * ResponseProductDTO — Formato de resposta de um produto na API.
 *
 * Este DTO define exatamente quais campos são retornados ao cliente nas respostas.
 * Isso garante que campos internos do banco (como `id`) nunca sejam expostos.
 * O mapeamento de "dado do banco → ResponseProductDTO" é feito pelo método
 * `toResponse()` no ProductService.
 */
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
  // Status é um dos três valores do enum: 'disponivel' | 'estoque_baixo' | 'indisponivel'
  status!: 'disponivel' | 'estoque_baixo' | 'indisponivel' | null | undefined;
}
