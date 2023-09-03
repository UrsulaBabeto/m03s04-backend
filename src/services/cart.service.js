
class CartService {
  async verifyCart(cart) {
    if (!cart) {
      return res.status(404).send({ message: "Carrinho não encontrado" });
    } else {
      return true;
    }
  }
}
module.exports = { CartService };
