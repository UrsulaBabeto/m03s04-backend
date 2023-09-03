const { User } = require("../model/User");

class UserService {
  async nameValidation() {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      return res.status(400).send({
        message: "Erro",
        cause: error.message,
      });
    }
  }
}
module.exports = { UserService }