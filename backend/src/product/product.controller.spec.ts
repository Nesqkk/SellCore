import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductResponse } from './constants/product.response';

import { CreateProductDTO } from './dtos/create.product';
import { UpdateProductDTO } from './dtos/update.product';

const mockProductService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByCode: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um produto', async () => {
      const createDto = {
        name: 'Produto Teste',
        code: '1234567',
      } as CreateProductDTO;
      mockProductService.create.mockResolvedValue([createDto]);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        ...ProductResponse.CREATED,
        data: [createDto],
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const mockProducts = [{ code: '123', name: 'Produto Teste' }];
      mockProductService.findAll.mockResolvedValue(mockProducts);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        ...ProductResponse.SUCCESS,
        data: mockProducts,
      });
    });
  });

  describe('findByCode', () => {
    it('deve retornar um produto pelo código', async () => {
      const mockProduct = [{ code: '123', name: 'Produto Teste' }];
      mockProductService.findByCode.mockResolvedValue(mockProduct);

      const result = await controller.findByCode('123');

      expect(service.findByCode).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('deve atualizar um produto', async () => {
      const updateDto = { name: 'Produto Atualizado' } as UpdateProductDTO;
      mockProductService.update.mockResolvedValue(ProductResponse.UPDATE);

      const result = await controller.update('123', updateDto);

      expect(service.update).toHaveBeenCalledWith('123', updateDto);
      expect(result).toEqual(ProductResponse.UPDATE);
    });
  });

  describe('delete', () => {
    it('deve deletar um produto', async () => {
      mockProductService.delete.mockResolvedValue(ProductResponse.DELETE);

      const result = await controller.delete('123');

      expect(service.delete).toHaveBeenCalledWith('123');
      expect(result).toEqual(ProductResponse.DELETE);
    });
  });
});
