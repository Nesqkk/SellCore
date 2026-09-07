import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dtos/create.customer';
import { UpdateCustomerDTO } from './dtos/update.customer';
import { CustomerResponse } from './constants/customer.response';

/**
 * Controller responsável por gerenciar as requisições HTTP relacionadas a Clientes (Customers).
 * Define a rota base da API como '/api/v1/customer'.
 * Delega as regras de negócio para o CustomerService.
 */
@Controller('api/v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Endpoint para criar um novo cliente.
   * @param customerDto Dados necessários para criação do cliente.
   * @returns Resposta padronizada indicando sucesso na criação.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() customerDto: CreateCustomerDTO) {
    await this.customerService.create(customerDto);

    return CustomerResponse.CREATED;
  }

  /**
   * Endpoint para buscar todos os clientes cadastrados.
   * @returns Lista de clientes junto com a resposta de sucesso padrão.
   */
  @Get()
  async findAll() {
    const customers = await this.customerService.findAll();

    return {
      ...CustomerResponse.SUCCESS,
      data: customers,
    };
  }

  /**
   * Endpoint para buscar um cliente específico pelo seu CPF.
   * @param cpf O CPF do cliente procurado (passado na URL).
   * @returns Os dados do cliente encontrado junto com a resposta de sucesso.
   */
  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    const customer = await this.customerService.findByCpf(cpf);

    return {
      ...CustomerResponse.SUCCESS,
      data: customer,
    };
  }

  /**
   * Endpoint para atualizar os dados de um cliente existente.
   * @param cpf O CPF do cliente a ser atualizado (passado na URL).
   * @param customerDto Os dados que serão atualizados.
   * @returns Resposta padronizada indicando sucesso na atualização.
   */
  @Put(':cpf')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('cpf') cpf: string,
    @Body() customerDto: UpdateCustomerDTO,
  ) {
    await this.customerService.update(cpf, customerDto);

    return CustomerResponse.UPDATE;
  }

  /**
   * Endpoint para deletar/remover um cliente do sistema pelo CPF.
   * @param cpf O CPF do cliente a ser removido (passado na URL).
   * @returns Resposta padronizada indicando sucesso na exclusão.
   */
  @Delete(':cpf')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('cpf') cpf: string) {
    await this.customerService.delete(cpf);

    return CustomerResponse.DELETE;
  }
}
