
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { isAdmin } = require('../middleware/auth');

const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next();
  }

  const adminUser = {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    role: 'admin',
  };

  User.findOrCreate({
    where: { email: adminUser.email },
    defaults: adminUser,
  });

  next();
};

const getUsers = async (req, resp, next) => {
  try {
    const users = await User.findAll();

    return resp.json(users);
  } catch (error) {
    next({ status: 500, message: 'Erro interno do servidor.' });
  }
};

const getUserById = async (req, resp, next) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      return next({ status: 404, message: 'Usuário não encontrado' });
    }

    resp.status(200).json(user);
  } catch (error) {
    next({ status: 500, message: 'Erro interno do servidor.' });
  }
};

const createUser = async (req, resp, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next({ status: 400, message: 'Todos os campos são obrigatórios.' });
    }

    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      role,
    });

    resp.status(201).json(newUser);
  } catch (error) {
    next({ status: 500, message: 'Erro interno do servidor.' });
  }
};

const updateUser = async (req, resp, next) => {
  try {
    const { uid } = req.params;

    if (!isAdmin(req) && req.user.id !== parseInt(uid, 10)) {
      return next({ status: 403, message: 'Acesso proibido' });
    }

    const { email, password, role } = req.body;
    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      return next({ status: 404, message: 'Usuário não encontrado' });
    }

    user.email = email || user.email;
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }
    user.role = role || user.role;

    await user.save();

    resp.status(200).json(user);
  } catch (error) {
    next({ status: 500, message: 'Erro interno do servidor.' });
  }
};

const deleteUser = async (req, resp, next) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      return next({ status: 404, message: 'Usuário não encontrado' });
    }

    await user.destroy();

    resp.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    next({ status: 500, message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  initAdminUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
