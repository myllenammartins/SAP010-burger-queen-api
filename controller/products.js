// products.js (controller)
const { Product } = require('../models');
const { isAdmin } = require('../middleware/auth');

module.exports = {
  getProducts: async (req, resp, next) => {
    try {
      const products = await Product.findAll();

      return resp.json(products);
    } catch (error) {      
      next({ status: 500, message: 'Erro interno do servidor.' });
    }
  },

  getProductById: async (req, resp, next) => {
    try {
      const uid = req.params.productId;
      const product = await Product.findOne({ where: { id: uid } });

      if (!product) {
        return resp.status(404).json({ message: 'Produto não encontrado' });
      }

      resp.status(200).json(product);
    } catch (error) {
      next({ status: 500, message: 'Erro interno do servidor.' });
    }
  },

  createProduct: async (req, resp, next) => {
    try {
      const {
        name,
        price,
        image,
        type,
      } = req.body;
      if (!name || !price || !image || !type) {
        return resp.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const newProduct = await Product.create({
        name,
        price,
        image,
        type,
      });
      return resp.status(201).json(newProduct);
    } catch (error) {
      next({ status: 500, message: 'Erro interno do servidor.' });
    }
  },

  updateProduct: async (req, resp, next) => {
    const uid = req.params.productId;

    if (!isAdmin(req) && req.product.id !== parseInt(uid, 10)) {
      next({ status: 403, message: 'Acesso proibido' });
    }

    try {
      const {
        name,
        price,
        image,
        type,
      } = req.body;

      const product = await Product.findOne({ where: { id: uid } });

      if (!product) {
        next({ status: 404, message: 'Produto não encontrado' });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.image = image || product.image;
      product.type = type || product.type;

      await product.save();

      resp.status(200).json(product);
    } catch (error) {

      next({ status: 500, message: 'Erro interno do servidor' });
    }
  },

  deleteProduct: async (req, resp, next) => {
    try {
      const uid = req.params.productId;
      const product = await Product.findOne({ where: { id: uid } });

      if (!product) {
        next({ status: 404, message: 'Produto não encontrado' });
      }

      await product.destroy();

      resp.status(200).json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {

      next({ status: 500, message: 'Erro interno do servidor' });
    }
  },
};
