import { Test, TestingModule } from '@nestjs/testing';

import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductNotFoundException } from './exception/product-not-found.exception';
import { ProductErrorRetrievingAllException } from './exception/product-error-retrieving-all-products.exception';
import { ProductErrorDeletingException } from './exception/product-error-deleting.exception';
import { ProductResponse } from './constants/product.response';

import { CreateProductDTO } from './dtos/create.product';
import { UpdateProductDTO } from './dtos/update.product';

const mockProductRepository = {
  findAll: jest.fn(),
  findByCode: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos mapeados', async () => {
      const mockData = [{ code: '123', name: 'Test' }];
      mockProductRepository.findAll.mockResolvedValue(mockData);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('123');
    });

    it('deve lançar erro se findAll falhar (retornar null/undefined)', async () => {
      mockProductRepository.findAll.mockResolvedValue(null);

      await expect(service.findAll()).rejects.toThrow(
        ProductErrorRetrievingAllException,
      );
    });
  });

  describe('findByCode', () => {
    it('deve retornar o produto', async () => {
      const mockData = [{ code: '123', name: 'Test' }];
      mockProductRepository.findByCode.mockResolvedValue(mockData);

      const result = await service.findByCode('123');

      expect(repository.findByCode).toHaveBeenCalledWith('123');
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('123');
    });

    it('deve lançar ProductNotFoundException quando produto não existir', async () => {
      mockProductRepository.findByCode.mockResolvedValue([]);

      await expect(service.findByCode('999')).rejects.toThrow(
        ProductNotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar e retornar o produto', async () => {
      const createDto = { code: '123', name: 'Test' } as CreateProductDTO;
      mockProductRepository.create.mockResolvedValue([createDto]);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual([createDto]);
    });
  });

  describe('update', () => {
    it('deve atualizar o produto', async () => {
      const updateDto = { name: 'Atualizado' } as UpdateProductDTO;
      mockProductRepository.update.mockResolvedValue({});

      const result = await service.update('123', updateDto);

      expect(repository.update).toHaveBeenCalledWith('123', updateDto);
      expect(result).toEqual(ProductResponse.UPDATE);
    });
  });

  describe('delete', () => {
    it('deve deletar o produto', async () => {
      mockProductRepository.findByCode.mockResolvedValue([{ code: '123' }]);
      mockProductRepository.delete.mockResolvedValue({});

      const result = await service.delete('123');

      expect(repository.findByCode).toHaveBeenCalledWith('123');
      expect(repository.delete).toHaveBeenCalledWith('123');
      expect(result).toEqual(ProductResponse.DELETE);
    });

    it('deve lançar ProductErrorDeletingException se produto não existir', async () => {
      mockProductRepository.findByCode.mockResolvedValue([]);

      await expect(service.delete('999')).rejects.toThrow(
        ProductErrorDeletingException,
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
