const products = require('../products');
const models = require('../../models');

jest.mock('../../models', () => ({
  Product: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('getProducts', () => {
  beforeEach(() => {
    models.Product.findAll.mockClear();
  });

  it('deve retornar uma lista de produtos', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    models.Product.findAll.mockResolvedValue(mockProducts);

    const req = {};
    const mockResp = {
      json: jest.fn(data => data),
    };
    const next = jest.fn();

    await products.getProducts(req, mockResp, next);

    expect(models.Product.findAll).toHaveBeenCalledTimes(1);
    expect(mockResp.json).toHaveBeenCalledWith(mockProducts);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve lidar com erros', async () => {
    const mockError = new Error('Erro simulado');

    models.Product.findAll.mockRejectedValue(mockError);

    const req = {};
    const mockResp = {};
    const mockNext = jest.fn();  // Add this line

    await products.getProducts(req, mockResp, mockNext);

    expect(models.Product.findAll).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe('getProductById', () => {
    it('deve retornar um produto por ID', async () => {
        const mockProduct = { id: 1, name: 'Product 1' };
    
        models.Product.findOne.mockResolvedValue(mockProduct);
        const req = { params: { productId: 1 } };
        const mockResp = { json: jest.fn() };
        const mockNext = jest.fn();  // Add this line
    
        await products.getProductById(req, mockResp, mockNext);
    
        expect(models.Product.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(mockResp.json).toHaveBeenCalledWith(mockProduct);
      });
    
      it('deve retornar erro 404 para produto não encontrado', async () => {
        models.Product.findOne.mockResolvedValue(null);
        const req = { params: { productId: 1 } };
        const mockResp = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockNext = jest.fn();  // Add this line
    
        await products.getProductById(req, mockResp, mockNext);
    
        expect(models.Product.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(mockResp.status).toHaveBeenCalledWith(404);
        expect(mockResp.json).toHaveBeenCalledWith({ message: 'Produto não encontrado' });
      });
    
      it('deve lidar com erros', async () => {
        const mockError = new Error('Erro simulado');

        models.Product.findOne.mockRejectedValue(mockError);
        const req = { params: { productId: 1 } };
        const mockResp = {};
        const mockNext = jest.fn();  // Add this line
    
        await products.getProductById(req, mockResp, mockNext);
    
        expect(models.Product.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
  });
  
  describe('createProduct', () => {
    it('deve criar um novo produto', async () => {
      const mockNewProduct = {
        id: 3,
        name: 'New Product',
        price: 10.99,
        image: 'new-product.jpg',
        type: 'category',
      };
  
      models.Product.create.mockResolvedValue(mockNewProduct);
  
      const req = {
        body: {
          name: 'New Product',
          price: 10.99,
          image: 'new-product.jpg',
          type: 'category',
        },
      };
      const mockResp = {
        json: jest.fn(data => data),
        status: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.createProduct(req, mockResp, mockNext);
  
      expect(models.Product.create).toHaveBeenCalledWith({
        name: 'New Product',
        price: 10.99,
        image: 'new-product.jpg',
        type: 'category',
      });
      expect(mockResp.json).toHaveBeenCalledWith(mockNewProduct);
      expect(mockResp.status).toHaveBeenCalledWith(201);
    });
  
    it('deve retornar erro 400 para campos ausentes', async () => {
      const req = {
        body: {},
      };
      const mockResp = {
        status: jest.fn().mockReturnThis(),  // Fix here: Use .mockReturnThis()
        json: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.createProduct(req, mockResp, mockNext);
  
      expect(mockResp.status).toHaveBeenCalledWith(400);
      expect(mockResp.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios.' });
      expect(mockNext).not.toHaveBeenCalled();  // Ensure next is not called
    });
  
    it('deve lidar com erros', async () => {
      const mockError = new Error('Erro simulado');
  
      models.Product.create.mockRejectedValue(mockError);
  
      const req = {
        body: {
          name: 'New Product',
          price: 10.99,
          image: 'new-product.jpg',
          type: 'category',
        },
      };
      const mockResp = {};
      const mockNext = jest.fn();
  
      await products.createProduct(req, mockResp, mockNext);
  
      expect(models.Product.create).toHaveBeenCalledWith({
        name: 'New Product',
        price: 10.99,
        image: 'new-product.jpg',
        type: 'category',
      });
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  

  describe('updateProduct', () => {
    it('deve atualizar um produto', async () => {
      const mockProduct = {
        id: 1,
        name: 'Updated Product',
        price: 19.99,
        image: 'updated-product.jpg',
        type: 'new-category',
      };
  
      models.Product.findOne.mockResolvedValue(mockProduct);
  
      const req = {
        params: { productId: 1 },
        body: {
          name: 'Updated Product',
          price: 19.99,
          image: 'updated-product.jpg',
          type: 'new-category',
        },
        product: { id: 1 }, // Mocking product for isAdmin check
      };
      const mockResp = {
        json: jest.fn(data => data),
        status: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.updateProduct(req, mockResp, mockNext);
  
      expect(models.Product.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockResp.json).toHaveBeenCalledWith(mockProduct);
      expect(mockResp.status).toHaveBeenCalledWith(200);
    });
  
    it('deve retornar erro 403 para acesso proibido', async () => {
      const req = {
        params: { productId: 1 },
        body: {
          name: 'Updated Product',
          price: 19.99,
          image: 'updated-product.jpg',
          type: 'new-category',
        },
        product: { id: 2 }, // Different product ID
      };
      const mockResp = {
        status: jest.fn().mockReturnThis(),  // Fix here: Use .mockReturnThis()
        json: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.updateProduct(req, mockResp, mockNext);
  
      expect(mockResp.status).toHaveBeenCalledWith(403);
      expect(mockResp.json).toHaveBeenCalledWith({ message: 'Acesso proibido' });
    });
  
    it('deve lidar com erros', async () => {
      const mockError = new Error('Erro simulado');
  
      models.Product.findOne.mockRejectedValue(mockError);
  
      const req = {
        params: { productId: 1 },
        body: {
          name: 'Updated Product',
          price: 19.99,
          image: 'updated-product.jpg',
          type: 'new-category',
        },
        product: { id: 1 },
      };
      const mockResp = {};
      const mockNext = jest.fn();
  
      await products.updateProduct(req, mockResp, mockNext);
  
      expect(models.Product.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  
  describe('deleteProduct', () => {
    it('deve excluir um produto', async () => {
      const mockProduct = {
        id: 1,
        name: 'Product to be deleted',
      };
  
      models.Product.findOne.mockResolvedValue(mockProduct);
      const mockDestroy = jest.fn();
      mockProduct.destroy = mockDestroy;
  
      const req = {
        params: { productId: 1 },
      };
      const mockResp = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.deleteProduct(req, mockResp);
  
      expect(models.Product.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockDestroy).toHaveBeenCalled();
      expect(mockResp.status).toHaveBeenCalledWith(200);
      expect(mockResp.json).toHaveBeenCalledWith({ message: 'Produto excluído com sucesso!' });
    });
  
    it('deve retornar erro 404 para produto não encontrado', async () => {
      models.Product.findOne.mockResolvedValue(null);
  
      const req = {
        params: { productId: 1 },
      };
      const mockResp = {
        status: jest.fn().mockReturnThis(),  // Fix here: Use .mockReturnThis()
        json: jest.fn(),
      };
      const mockNext = jest.fn();
  
      await products.deleteProduct(req, mockResp);
  
      expect(models.Product.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockResp.status).toHaveBeenCalledWith(404);
      expect(mockResp.json).toHaveBeenCalledWith({ message: 'Produto não encontrado' });
    });
  
    it('deve lidar com erros', async () => {
      const mockError = new Error('Erro simulado');
  
      models.Product.findOne.mockRejectedValue(mockError);
  
      const req = {
        params: { productId: 1 },
      };
      const mockResp = {};
      const mockNext = jest.fn();
  
      await products.deleteProduct(req, mockResp, mockNext);
  
      expect(models.Product.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  