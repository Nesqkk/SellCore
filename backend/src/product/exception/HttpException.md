# Guia de Exceções HTTP (NestJS)

Este documento serve como referência rápida para as principais exceções e códigos de status HTTP disponíveis nativamente no **NestJS**, ajudando a padronizar as respostas de erro do backend.

> **Dica NestJS:** Todas as exceções abaixo podem ser importadas do pacote `@nestjs/common` e devem ser lançadas utilizando `throw new NomeDaException()`.

## 🟡 Erros do Cliente (4xx)

Acontecem quando há um problema com a requisição feita pelo cliente (frontend, mobile, etc).

### 400 Bad Request (`BadRequestException`)

- **Quando usar:** A requisição foi malformada sintaticamente ou possui parâmetros inválidos/ausentes.
- **Para que serve:** Informar ao cliente que ele precisa corrigir o que foi enviado.
- **Exemplo no código:** `throw new BadRequestException('O campo preço é obrigatório');`

### 401 Unauthorized (`UnauthorizedException`)

- **Quando usar:** O cliente não está autenticado. Faltou o token de acesso ou ele é inválido/expirado.
- **Para que serve:** Exigir que o usuário faça login ou forneça credenciais válidas.
- **Exemplo no código:** `throw new UnauthorizedException('Token JWT inválido ou expirado');`

### 403 Forbidden (`ForbiddenException`)

- **Quando usar:** O cliente **está autenticado**, mas **não tem permissão** para acessar aquele recurso específico.
- **Para que serve:** Bloquear acesso baseado em _roles_ (ex: Admin vs Usuário Comum).
- **Exemplo no código:** `throw new ForbiddenException('Você não tem permissão para deletar este produto');`

### 404 Not Found (`NotFoundException`)

- **Quando usar:** O recurso solicitado não existe no banco de dados.
- **Para que serve:** Avisar que a entidade procurada não existe.
- **Exemplo no código:** `throw new NotFoundException('Produto com o ID informado não foi encontrado');`

### 406 Not Acceptable (`NotAcceptableException`)

- **Quando usar:** Quando o servidor não pode gerar uma resposta que corresponda à solicitação de cabeçalho `Accept` do cliente.

### 408 Request Timeout (`RequestTimeoutException`)

- **Quando usar:** O servidor queria fechar a conexão não utilizada em vez de aguardar mais dados do cliente.

### 409 Conflict (`ConflictException`)

- **Quando usar:** A requisição causa um conflito com o estado atual do servidor (geralmente duplicidade).
- **Para que serve:** Evitar cadastros duplicados no banco de dados.
- **Exemplo no código:** `throw new ConflictException('Já existe um produto cadastrado com este SKU');`

### 422 Unprocessable Entity (`UnprocessableEntityException`)

- **Quando usar:** A sintaxe da requisição está correta, mas contém erros semânticos de regras de negócio.
- **Para que serve:** Tratar erros de validação mais refinados.
- **Exemplo no código:** `throw new UnprocessableEntityException('O estoque não pode ser negativo');`

### 429 Too Many Requests (`ThrottlerException`)

- **Como funciona no NestJS:** Em vez de uma exceção comum, o NestJS lida com isso através do pacote de _Rate Limiting_ oficial (`@nestjs/throttler`), lançando automaticamente a `ThrottlerException`.

---

## 🔴 Erros do Servidor (5xx)

Acontecem quando o servidor falha ao tentar processar uma requisição que era válida.

### 500 Internal Server Error (`InternalServerErrorException`)

- **Quando usar:** Um erro genérico e inesperado aconteceu no código backend.
- **Para que serve:** O NestJS lança isso por padrão quando uma exceção não é tratada (ex: erro estourando no banco). Se você lançar manualmente, use para mascarar detalhes do erro ao cliente.
- **Exemplo no código:** `throw new InternalServerErrorException('Erro interno ao tentar salvar a imagem');`

### 502 Bad Gateway (`BadGatewayException`)

- **Quando usar:** A comunicação entre os servidores falhou (ex: o backend tentou chamar um microserviço ou API que falhou de forma inválida).

### 503 Service Unavailable (`ServiceUnavailableException`)

- **Quando usar:** O servidor está temporariamente indisponível.
- **Exemplo no código:** `throw new ServiceUnavailableException('O serviço de integração fiscal está temporariamente fora do ar');`

### 504 Gateway Timeout (`GatewayTimeoutException`)

- **Quando usar:** Uma API externa ou de terceiros (ex: provedor de pagamentos) demorou muito para responder e estourou o tempo limite.

---

## 🔧 Exceção Customizada (`HttpException`)

Se você precisar lançar um código HTTP que não possui uma classe específica nativa, você pode usar a classe base `HttpException` (a mãe de todas as outras).

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

// Exemplo lançando o código 402 (Payment Required) que não tem classe específica
throw new HttpException(
  'Pagamento exigido para esta ação',
  HttpStatus.PAYMENT_REQUIRED,
);
```
