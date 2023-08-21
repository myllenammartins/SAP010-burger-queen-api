const users = require("../users");
const models = require("../../models");

const bcrypt = require("bcrypt");
const { User } = require("../../models");

const { isAdmin } = require("../../middleware/auth");

jest.mock("../../middleware/auth", () => ({
  isAdmin: jest.fn(),
}));

jest.mock("../../models", () => ({
  User: {
    findAll: jest.fn(() => [
      {
        id: "1",
        email: "ana@api.com",
        password: "523",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        email: "rosana@api.com",
        password: "987",
        role: "chef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        email: "josé@api.com",
        password: "456",
        role: "waiter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe("getUsers", () => {
  it("Deve obter coleção de usuários", async () => {
    const mockReq = {};
    const mockResp = {
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await users.getUsers(mockReq, mockResp, mockNext);

    expect(mockResp.json).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("Deve lidar com erro de banco de dados", async () => {
    const mockReq = {};
    const mockResp = {};
    const mockNext = jest.fn();

    models.User.findAll.mockRejectedValueOnce(new Error("Database error"));

    await users.getUsers(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });

  it("Deve lidar corretamente com chamadas assíncronas", async () => {
    const mockReq = {};
    const mockResp = {
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    models.User.findAll.mockResolvedValueOnce(
      new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    await users.getUsers(mockReq, mockResp, mockNext);

    expect(mockResp.json).toHaveBeenCalledWith([]);
  });

  it("Deve lidar com coleção vazia de usuários", async () => {
    const mockReq = {};
    const mockResp = {
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    models.User.findAll.mockResolvedValueOnce([]);

    await users.getUsers(mockReq, mockResp, mockNext);

    expect(mockResp.json).toHaveBeenCalledWith([]);
  });
});

describe("getUserById", () => {
  it("Deve lidar com usuário não encontrado", async () => {
    const mockReq = {
      params: { uid: "99" },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    models.User.findOne.mockResolvedValueOnce(null);

    await users.getUserById(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 404,
      message: "Usuário não encontrado",
    });
  });

  it("Deve lidar com erro ao buscar usuário por ID", async () => {
    const mockReq = {
      params: { uid: "1" },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    models.User.findOne.mockRejectedValueOnce(new Error("Database error"));

    await users.getUserById(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });
});

describe("createUser", () => {
  it("Deve lidar com campos obrigatórios ausentes", async () => {
    const mockReq = {
      body: {
        email: "newuser@api.com",
      },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    await users.createUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 400,
      message: "Todos os campos são obrigatórios.",
    });
  });

  it("Deve lidar com erro ao criar usuário", async () => {
    const mockReq = {
      body: {
        email: "newuser@api.com",
        password: "newpassword",
        role: "user",
      },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    models.User.create.mockRejectedValueOnce(new Error("Database error"));

    await users.createUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });
});

describe("updateUser", () => {
  it("Deve lidar com erro ao atualizar usuário", async () => {
    const mockReq = {
      params: { uid: "1" },
      body: {
        email: "updated@api.com",
        role: "updatedRole",
      },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    models.User.findOne.mockResolvedValueOnce({
      id: "1",
      email: "ana@api.com",
      password: "523",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockRejectedValueOnce(new Error("Database error")),
    });

    await users.updateUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });
  it("Deve lidar com acesso proibido", async () => {
    const mockReq = {
      params: { uid: "1" },
      body: {
        email: "updated@api.com",
        role: "updatedRole",
      },
      user: { id: 2 }, // Simulando um usuário diferente
    };
    const mockResp = {};
    const mockNext = jest.fn();

    isAdmin.mockReturnValueOnce(false); // Simulando que não é um admin

    await users.updateUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 403,
      message: "Acesso proibido",
    });
  });

  it("Deve lidar com erro ao atualizar usuário", async () => {
    const mockReq = {
      params: { uid: "1" },
      body: {
        email: "updated@api.com",
        role: "updatedRole",
      },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    const mockUser = {
      id: "1",
      email: "ana@api.com",
      password: "523",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockRejectedValueOnce(new Error("Database error")),
    };

    User.findOne.mockResolvedValueOnce(mockUser);

    await users.updateUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });
});

describe("deleteUser", () => {
  it("Deve lidar com erro ao excluir usuário", async () => {
    const mockReq = {
      params: { uid: "1" },
    };
    const mockResp = {};
    const mockNext = jest.fn();

    const mockUser = {
      id: "1",
      email: "ana@api.com",
      password: "523",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      destroy: jest.fn().mockRejectedValueOnce(new Error("Database error")),
    };

    models.User.findOne.mockResolvedValueOnce(mockUser);

    await users.deleteUser(mockReq, mockResp, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: 500,
      message: "Erro interno do servidor.",
    });
  });
});
