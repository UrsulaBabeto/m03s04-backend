const { sign } = require("jsonwebtoken");
const { Cart } = require("../model/Cart");
const { Product } = require('../model/Product')
class CartController {
  async create(req, res) {
    try {
      const { userId } = req.body;

      const user = await Cart.findByPk(userId)
      if(!user) return res.status(404).send({ message: "Usuario não já existe" });

      const existCart = await Cart.findOne({
        where: { userId: userId, status: true },
      });

      if (existCart) {
        return res.status(403).send({ message: "Carrinho já existe" });
      }

      const cartCreated = await Cart.create({
        userId,
        price: 0,
        status: true,
      });

      return res.status(201).send(cartCreated);
    } catch (error) {
      return res.status(400).send({
        message: "Erro na criação do carrinho",
        cause: error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const carts = await Cart.findAll();

      return res.status(200).send(carts);
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar carrinhos",
        cause: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return res.status(404).send({ message: "Carrinho não encontrado" });
      }

      return res.status(200).send({ cart });
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar o carrinho",
        cause: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return res.status(404).send({ message: "Carrinho não encontrado" });
      }

      await cart.destroy();

      return res
        .status(200)
        .send({ message: "Carrinho Removido com sucesso!" });
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao remover carrinho",
        cause: error.message,
      });
    }
  }

  async restore(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findOne({
        where: { cartId: cartId },
        paranoid: false,
      });

      if (!cart) {
        return res.status(404).send({ message: "Carrinho não encontrado" });
      }

      await cart.restore();

      return res
        .status(201)
        .send({ message: "Carrinho restaurado com sucesso!" });
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao restaurar um carrinho",
        cause: error.message,
      });
    }
  }

  async findAllAdm(req, res) {
    try {
      const cart = await Cart.findAll({ paranoid: false });

      if (!cart) {
        return res.status(404).send({ message: "Carrinho não encontrado" });
      }

      return res.status(200).send({ cart });
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar o carrinho",
        cause: error.message,
      });
    }
  }

  async buyProduct(req, res) {
    try {
        const { cartId, productsId } = req.body
        const cart = await Cart.findOne({ where: {cartId:cartId} })
        const product = await Product.findAll({ where: {productId: productsId} })

        await cart.addProduct(product);

        return res.status(201).send({
            message: "Produto atribuido ao carrinho com sucesso"
        })
    } catch (error) {
        return res.status(400).send({
            message: "Erro ao comprar o produto para esse usuário",
            cause: error.message
        })
    }
}
}

module.exports = new CartController();
