import { Injectable } from '@nestjs/common';

import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './dtos/create.customer';
import { UpdateCustomerDTO } from './dtos/update.customer';

import { customerTable } from '../database/schema/customer.schema';

import { CustomerErrorLoadingClientException } from './exception/customer-error-loading-client.exception';
import { CustomerErrorLoadingCustomerByCpfException } from './exception/customer-error-loading-customer-by-cpf.exception';
import { CustomerErrorCreatingACustomerException } from './exception/customer-error-creating-a-customer.exception';
import { CustomerErrorDeletingCustomerException } from './exception/customer-error-deleting-customer.exception';

/**
 * Service que contém as regras de negócio relacionadas a Clientes.
 * Ele faz a ponte entre a Controller e o Repository, validando fluxos
 * e tratando exceções antes de persistir ou ler dados.
 */
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Retorna a lista de todos os clientes cadastrados.
   * Lança uma exceção se nenhum cliente for encontrado ou ocorrer um erro de carga.
   */
  async findAll() {
    const customers = await this.customerRepository.findAll();

    if (!customers || customers.length === 0) {
      throw new CustomerErrorLoadingClientException();
    }

    // Mapeia os dados do banco para o formato de resposta desejado
    return customers.map((c) => this.toResponse(c));
  }

  /**
   * Busca um cliente pelo CPF.
   * Lança uma exceção se não achar o cliente correspondente ao CPF informado.
   */
  async findByCpf(cpf: string) {
    const customer = await this.customerRepository.findByCpf(cpf);

    if (!customer || customer.length === 0) {
      throw new CustomerErrorLoadingCustomerByCpfException();
    }

    return customer.map((c) => this.toResponse(c));
  }

  /**
   * Cria um novo cliente no banco de dados.
   * Garante que campos não obrigatórios recebam 'null' caso não venham preenchidos.
   */
  async create(data: CreateCustomerDTO) {
    const customerData = {
      ...data,
      // Se block, lot ou complement não existirem, passa null para padronizar no banco
      block: data.block || null,
      lot: data.lot || null,
      complement: data.complement || null,
    };

    const createdCustomer = await this.customerRepository.create(customerData);

    if (!createdCustomer || createdCustomer.length === 0) {
      throw new CustomerErrorCreatingACustomerException();
    }
  }

  /**
   * Atualiza as informações de um cliente buscando pelo CPF.
   * Lança uma exceção se não houver cliente com o CPF informado para atualizar.
   */
  async update(cpf: string, data: UpdateCustomerDTO) {
    const updateCustomer = await this.customerRepository.update(cpf, data);

    if (!updateCustomer || updateCustomer.length === 0) {
      throw new CustomerErrorLoadingCustomerByCpfException();
    }

    return updateCustomer;
  }

  /**
   * Exclui um cliente correspondente ao CPF informado.
   * Lança uma exceção em caso de falha na exclusão (ex: cliente não encontrado).
   */
  async delete(cpf: string) {
    const deleteCustomer = await this.customerRepository.delete(cpf);

    if (!deleteCustomer || deleteCustomer.length === 0) {
      throw new CustomerErrorDeletingCustomerException();
    }
  }

  /**
   * Método auxiliar (privado) para formatar/isolar os dados vindos do banco
   * antes de retorná-los para a Controller, garantindo que apenas as propriedades
   * corretas sejam expostas.
   */
  private toResponse(customer: typeof customerTable.$inferSelect) {
    return {
      cpf: customer.cpf,
      name: customer.name,
      birth_date: customer.birth_date,
      email: customer.email,
      phone: customer.phone,
      zip_code: customer.zip_code,
      street: customer.street,
      number: customer.number,
      block: customer.block,
      lot: customer.lot,
      complement: customer.complement,
      neighborhood: customer.neighborhood,
      city: customer.city,
      state: customer.state,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }
}
