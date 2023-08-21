const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { Op } = require('sequelize');
const { User } = require('../models');
const { secret } = require('../config');

module.exports = {
  postAuth: async (req, resp, next) => {
    console.info('Received login request');
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ status: 400, message: 'Bad request' });
    }

    try {
      const user = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });

      if (!user) {
        return next({ status: 401, message: 'Unauthorized' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return next({ status: 401, message: 'Unauthorized' });
      }

      const token = jwt.sign({ email: user.email, role: user.role }, secret, { expiresIn: '1h' });
      resp.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      next({ status: 500, message: 'Internal server error' });
    }
  },
};
