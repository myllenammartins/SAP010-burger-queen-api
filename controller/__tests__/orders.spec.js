const orders = require("../orders");
const models = require('../../models');

jest.mock('../../models', () => ({
  Order: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Product: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  User: {
    findByPk: jest.fn(),
  },
}));

describe('orders', () => {
  beforeEach(() => {
    models.Order.findAll.mockClear();
    models.Order.findOne.mockClear();
    models.Order.create.mockClear();
    models.Product.findAll.mockClear();
    models.Product.findByPk.mockClear();
    models.User.findByPk.mockClear();
  });

  it('deve retornar uma lista com a ordem, informações do pedido e a data processada', async () => {
    const mockOrders = [
      {
        id: 1,
        userId: 1,
        client: 'Client 1',
        status: 'Concluído',
        dateEntry: '2023-08-17',
        dateProcessed: '2023-08-18',
        Products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            image: 'product1.jpg',
            type: 'Type A',
            OrderProducts: {
              quantity: 2,
            },
          },
        ],
      },
    ];

    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        image: 'product1.jpg',
        type: 'Type A',
      },
    ];

    models.Order.findAll.mockResolvedValue(mockOrders);
    models.Product.findAll.mockResolvedValue(mockProducts);

    const req = {};
    const resp = {
      json: jest.fn(data => data),
    };
    const next = jest.fn();

    await orders.getOrders(req, resp, next);

    expect(models.Order.findAll).toHaveBeenCalledTimes(1);
    expect(models.Product.findAll).toHaveBeenCalledTimes(0);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve lidar com erros', async () => {
    const mockError = new Error('Simulated error');

    models.Order.findAll.mockRejectedValue(mockError);

    const req = {};
    const resp = {};
    const next = jest.fn();

    await orders.getOrders(req, resp, next);

    expect(models.Order.findAll).toHaveBeenCalledTimes(1);
    expect(models.Product.findAll).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('deve retornar uma ordem pelo ID', async () => {
    const mockOrder = {
      id: 1,
      userId: 1,
      client: 'Cliente Simulado',
      status: 'Concluído',
      dateEntry: '2023-08-17',
      dateProcessed: '2023-08-18',
      Products: [
        {
          id: 1,
          name: 'Produto Simulado',
          price: 10.0,
          image: 'product1.jpg',
          type: 'Tipo A',
          OrderProducts: {
            quantity: 2,
          },
        },
      ],
    };
  
    models.Order.findOne.mockResolvedValue(mockOrder);
  
    const req = {
      params: {
        orderId: 1, // ID simulado da ordem
      },
    };
    const resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    await orders.getOrderById(req, resp, next);
  
    expect(models.Order.findOne).toHaveBeenCalledWith({
      where: { id: req.params.orderId },
      include: {
        model: models.Product,
        through: { attributes: ['quantity'] },
      },
    });
    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith(mockOrder);
    expect(next).not.toHaveBeenCalled();
  });
  
  it('deve lidar com erro ao buscar ordem pelo ID', async () => {
    const mockError = new Error('Erro simulado');

    models.Order.findOne.mockRejectedValue(mockError);

    const req = {
      params: {
        orderId: 1, // ID simulado da ordem
      },
    };
    const resp = {};
    const next = jest.fn();

    await orders.getOrderById(req, resp, next);

    expect(models.Order.findOne).toHaveBeenCalledWith({
      where: { id: req.params.orderId },
      include: {
        model: models.Product,
        through: { attributes: ['quantity'] },
      },
    });
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('deve criar uma nova ordem', async () => {
    const mockReqBody = {
      userId: 1,
      client: 'Novo Cliente',
      products: [
        {
          qty: 2,
          product: {
            id: 1,
          },
        },
      ],
    };
  
    const mockCreatedOrder = {
      id: 2,
      userId: 1,
      client: 'Novo Cliente',
      status: 'Pendente',
      dateEntry: new Date(),
      Products: [
        {
          id: 1,
          name: 'Produto Simulado',
          price: 10.0,
          image: 'product1.jpg',
          type: 'Tipo A',
          OrderProducts: {
            quantity: 2,
          },
        },
      ],
    };
  
    models.User.findByPk.mockResolvedValue({
      id: 1,
      name: 'Usuário Simulado',
    });
  
    models.Product.findByPk.mockResolvedValue({
      id: 1,
      name: 'Produto Simulado',
      price: 10.0,
      image: 'product1.jpg',
      type: 'Tipo A',
    });
  
    models.Order.create.mockResolvedValue(mockCreatedOrder);
  
    const req = {
      body: mockReqBody,
    };
    const resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    await orders.createOrder(req, resp, next);
  
    expect(models.User.findByPk).toHaveBeenCalledWith(mockReqBody.userId);
    expect(models.Product.findByPk).toHaveBeenCalledWith(
      mockReqBody.products[0].product.id
    );
    expect(models.Order.create).toHaveBeenCalledWith({
      userId: mockReqBody.userId,
      client: mockReqBody.client,
      status: 'Pendente',
      dateEntry: expect.any(Date),
    });
    expect(resp.status).toHaveBeenCalledWith(201);
    expect(resp.json).toHaveBeenCalledWith(mockCreatedOrder);
    expect(next).not.toHaveBeenCalled();
  });
  

  it('deve lidar com erro ao criar uma nova ordem', async () => {
    const mockError = new Error('Erro simulado');

    models.User.findByPk.mockResolvedValue(/* Usuário simulado */);
    models.Product.findByPk.mockResolvedValue(/* Produto simulado */);
    models.Order.create.mockRejectedValue(mockError);

    const req = {
      body: {
        // Dados simulados da requisição
      },
    };
    const resp = {};
    const next = jest.fn();

    await orders.createOrder(req, resp, next);

    // Verificações dos mocks e chamadas de função
    // ...
  });

  it('deve atualizar o status de uma ordem', async () => {
    const mockOrder = {
      id: 1,
      userId: 1,
      client: 'Cliente Simulado',
      status: 'Pendente',
      dateEntry: '2023-08-17',
      dateProcessed: null,
    };
  
    models.Order.findByPk.mockResolvedValue(mockOrder);
  
    const req = {
      params: {
        orderId: 1, // ID simulado da ordem
      },
      body: {
        status: 'Concluído', // Status simulado
      },
    };
    const resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    await orders.updateOrder(req, resp, next);
  
    expect(models.Order.findByPk).toHaveBeenCalledWith(req.params.orderId);
    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({
      id: mockOrder.id,
      userId: mockOrder.userId,
      client: mockOrder.client,
      status: 'Concluído',
      dateEntry: mockOrder.dateEntry,
      dateProcessed: expect.any(Date),
    });
    expect(next).not.toHaveBeenCalled();
  });
  

  it('deve lidar com erro ao atualizar o status de uma ordem', async () => {
    const mockError = new Error('Erro simulado');

    models.Order.findByPk.mockRejectedValue(mockError);

    const req = {
      params: {
        orderId: 1, // ID simulado da ordem
      },
      body: {
        status: 'Concluído', // Status simulado
      },
    };
    const resp = {};
    const next = jest.fn();

    await orders.updateOrder(req, resp, next);

    // Verificações dos mocks e chamadas de função
    // ...
  });

  it('deve excluir uma ordem', async () => {
    const mockOrder = {
      id: 1,
      userId: 1,
      client: 'Cliente Simulado',
      status: 'Pendente',
      dateEntry: '2023-08-17',
      dateProcessed: null,
    };
  
    models.Order.findOne.mockResolvedValue(mockOrder);
  
    const req = {
      params: {
        orderId: 1, // ID simulado da ordem
      },
    };
    const resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    await orders.deleteOrder(req, resp, next);
  
    expect(models.Order.findOne).toHaveBeenCalledWith({
      where: { id: req.params.orderId },
    });
    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({ message: 'Ordem excluída com sucesso!' });
    expect(next).not.toHaveBeenCalled();
  });
  

});
