const { sign } = require("jsonwebtoken");
const { User } = require("../model/User");
const { Cart } = require("../model/Cart");
const { nameValidation } = require("../services/user.sevice");
const bcrypt = require('bcrypt')

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const userCreated = await User.create({
        name,
        email,
        password,
      });

      return res.status(201).send(userCreated);
    } catch (error) {
      return res.status(400).send({
        message: "Erro na criação de usuário",
        cause: error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar todos os usuários",
        cause: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const { userId } = req.params;
      nameValidation()

      return res.status(200).send(`Usuário: ${user.email}`);
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar o usuário",
        cause: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(404).send({ message: "Usuário não Encontrado!" });
      }

      if (user.password === password) {
        const payload = {
          name: user.name,
          email: user.email,
        };

        const token = sign(payload, process.env.JWT_SECRET);
        return res.status(200).send({ token });
      } else {
        return res.status(400).send({ message: "Senha inválida" });
      }
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao realizar o login do usuário",
        cause: error.message,
      });
    }
  }

  async findCarts(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        include: [{ model: Cart, as: "carts", key: "user_id" }],
      });

      if (!user) {
        return res.status(404).send({ message: `Usuário não encontrado` });
      }

      return res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao listar o usuário",
        cause: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req.params;
      const { name } = req.body;

      nameValidation()

      if (!name) {
        return res.status(400).send({ message: "DIgite um campo valido" });
      }

      if (name === user.name) {
        return res
          .status(403)
          .send({ message: "Usuário já existente, tente novamente." });
      }

      await update(userId, { name });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao atualizar o usuário",
        cause: error.message,
      });
    }
  }
  async updatePassword(req, res) {
    try {
        const { userId } = req.params
        const { password } = req.body

        await nameValidation()

        const match = bcrypt.compareSync(password, user.password)
        if(match) {
            return res.status(400).json({ error: "A senha já está sendo usada!"})
        }

        await update(userId, {password})

        return res.status(204).send()
    } catch (error) {
        return res.status(400).send({
            message: "Erro ao realizar o update de senha do usuário",
            cause: error.message
        })
    }

}
}

module.exports = new UserController();
