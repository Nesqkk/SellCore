import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './dtos/create.customer';
import { UpdateCustomerDTO } from './dtos/update.customer';

import { CustomerErrorLoadingClientException } from './exception/customer-error-loading-client.exception';
import { CustomerErrorLoadingCustomerByCpfException } from './exception/customer-error-loading-customer-by-cpf.exception';
import { CustomerErrorCreatingACustomerException } from './exception/customer-error-creating-a-customer.exception';
import { CustomerErrorDeletingCustomerException } from './exception/customer-error-deleting-customer.exception';

const mockCustomer = {
  cpf: '12345678901',
  name: 'João da Silva',
  birth_date: '1990-01-01',
  email: 'joao@example.com',
  phone: '11999999999',
  zip_code: '12345678',
  street: 'Rua das Flores',
  number: '123',
  block: 'A',
  lot: '1',
  complement: 'Casa 1',
  neighborhood: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2023-01-01'),
};

const mockCustomerRepository = {
  findAll: jest.fn(),
  findByCpf: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar lista de clientes com sucesso', async () => {
      mockCustomerRepository.findAll.mockResolvedValueOnce([mockCustomer]);
      const result = await service.findAll();

      // O toResponse apenas retorna uma cópia formatada, será igual ao mock
      expect(result).toEqual([
        {
          cpf: mockCustomer.cpf,
          name: mockCustomer.name,
          birth_date: mockCustomer.birth_date,
          email: mockCustomer.email,
          phone: mockCustomer.phone,
          zip_code: mockCustomer.zip_code,
          street: mockCustomer.street,
          number: mockCustomer.number,
          block: mockCustomer.block,
          lot: mockCustomer.lot,
          complement: mockCustomer.complement,
          neighborhood: mockCustomer.neighborhood,
          city: mockCustomer.city,
          state: mockCustomer.state,
          created_at: mockCustomer.created_at,
          updated_at: mockCustomer.updated_at,
        },
      ]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve lançar exceção se não houver clientes (array vazio)', async () => {
      mockCustomerRepository.findAll.mockResolvedValueOnce([]);
      await expect(service.findAll()).rejects.toThrow(
        CustomerErrorLoadingClientException,
      );
    });

    it('deve lançar exceção se findAll retornar null', async () => {
      mockCustomerRepository.findAll.mockResolvedValueOnce(null);
      await expect(service.findAll()).rejects.toThrow(
        CustomerErrorLoadingClientException,
      );
    });
  });

  describe('findByCpf', () => {
    it('deve retornar um cliente com sucesso', async () => {
      mockCustomerRepository.findByCpf.mockResolvedValueOnce([mockCustomer]);
      const result = await service.findByCpf('12345678901');

      expect(result).toEqual([
        {
          cpf: mockCustomer.cpf,
          name: mockCustomer.name,
          birth_date: mockCustomer.birth_date,
          email: mockCustomer.email,
          phone: mockCustomer.phone,
          zip_code: mockCustomer.zip_code,
          street: mockCustomer.street,
          number: mockCustomer.number,
          block: mockCustomer.block,
          lot: mockCustomer.lot,
          complement: mockCustomer.complement,
          neighborhood: mockCustomer.neighborhood,
          city: mockCustomer.city,
          state: mockCustomer.state,
          created_at: mockCustomer.created_at,
          updated_at: mockCustomer.updated_at,
        },
      ]);
      expect(repository.findByCpf).toHaveBeenCalledWith('12345678901');
    });

    it('deve lançar exceção se o cliente não for encontrado (array vazio)', async () => {
      mockCustomerRepository.findByCpf.mockResolvedValueOnce([]);
      await expect(service.findByCpf('12345678901')).rejects.toThrow(
        CustomerErrorLoadingCustomerByCpfException,
      );
    });
  });

  describe('create', () => {
    it('deve criar um cliente com sucesso', async () => {
      const createDto: CreateCustomerDTO = {
        cpf: '12345678901',
        name: 'João da Silva',
        birth_date: '1990-01-01',
        email: 'joao@example.com',
        phone: '11999999999',
        zip_code: '12345678',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
      };

      mockCustomerRepository.create.mockResolvedValueOnce([mockCustomer]);

      await expect(service.create(createDto)).resolves.not.toThrow();
      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        block: null,
        lot: null,
        complement: null,
      });
    });

    it('deve lançar exceção ao falhar na criação (array vazio retornado)', async () => {
      mockCustomerRepository.create.mockResolvedValueOnce([]);
      await expect(service.create({} as CreateCustomerDTO)).rejects.toThrow(
        CustomerErrorCreatingACustomerException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar cliente com sucesso', async () => {
      const updateDto: UpdateCustomerDTO = { name: 'Nome Atualizado' };
      mockCustomerRepository.update.mockResolvedValueOnce([mockCustomer]);

      const result = await service.update('12345678901', updateDto);
      expect(result).toEqual([mockCustomer]);
      expect(repository.update).toHaveBeenCalledWith('12345678901', updateDto);
    });

    it('deve lançar exceção se não conseguir atualizar (ex: cpf não existe)', async () => {
      mockCustomerRepository.update.mockResolvedValueOnce([]);
      await expect(service.update('12345678901', {})).rejects.toThrow(
        CustomerErrorLoadingCustomerByCpfException,
      );
    });
  });

  describe('delete', () => {
    it('deve deletar cliente com sucesso', async () => {
      mockCustomerRepository.delete.mockResolvedValueOnce([mockCustomer]);
      await expect(service.delete('12345678901')).resolves.not.toThrow();
      expect(repository.delete).toHaveBeenCalledWith('12345678901');
    });

    it('deve lançar exceção ao falhar na exclusão (ex: cpf não existe)', async () => {
      mockCustomerRepository.delete.mockResolvedValueOnce([]);
      await expect(service.delete('12345678901')).rejects.toThrow(
        CustomerErrorDeletingCustomerException,
      );
    });
  });
});
