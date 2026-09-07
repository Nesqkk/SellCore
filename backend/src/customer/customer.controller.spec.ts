import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dtos/create.customer';
import { UpdateCustomerDTO } from './dtos/update.customer';
import { CustomerResponse } from './constants/customer.response';

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

const mockCustomerService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByCpf: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo cliente com sucesso', async () => {
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

      mockCustomerService.create.mockResolvedValueOnce(undefined);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(CustomerResponse.CREATED);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de clientes com sucesso', async () => {
      mockCustomerService.findAll.mockResolvedValueOnce([mockCustomer]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...CustomerResponse.SUCCESS,
        data: [mockCustomer],
      });
    });
  });

  describe('findByCpf', () => {
    it('deve retornar um cliente específico pelo cpf com sucesso', async () => {
      mockCustomerService.findByCpf.mockResolvedValueOnce([mockCustomer]);

      const result = await controller.findByCpf('12345678901');

      expect(service.findByCpf).toHaveBeenCalledWith('12345678901');
      expect(service.findByCpf).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...CustomerResponse.SUCCESS,
        data: [mockCustomer],
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um cliente com sucesso', async () => {
      const updateDto: UpdateCustomerDTO = { name: 'João Atualizado' };
      mockCustomerService.update.mockResolvedValueOnce([mockCustomer]);

      const result = await controller.update('12345678901', updateDto);

      expect(service.update).toHaveBeenCalledWith('12345678901', updateDto);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(CustomerResponse.UPDATE);
    });
  });

  describe('delete', () => {
    it('deve deletar um cliente com sucesso', async () => {
      mockCustomerService.delete.mockResolvedValueOnce(undefined);

      const result = await controller.delete('12345678901');

      expect(service.delete).toHaveBeenCalledWith('12345678901');
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(CustomerResponse.DELETE);
    });
  });
});
