const { User } = require("../model/User");

class UserService {
  async update(userId, { name, email, password }) {
    const dataForUpdate = Object.assign(
      {},
      email && { email },
      name && { name },
      password && { password }
    );

    await User.update(dataForUpdate, {
      where: { userId },
      individualHooks: true,
    });
  }

  async verifyUser(user) {
    if (!user) {
      return res
        .status(404)
        .send({ message: "O usuário informado não existe!" });
    } else {
      return true;
    }
  }
}

module.exports = new UserService();
