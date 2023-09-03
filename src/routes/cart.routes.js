const {
  create,
  findAll,
  findOne,
  findAllAdm,
  remove,
  restore,
} = require("../controller/cart.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");

class CartRouter {
  routesFromCart() {
    const cartRoutes = Router();
    cartRoutes.post("/cart", auth, create);
    cartRoutes.get("/cart", auth, findAll);
    cartRoutes.get("/cart/:cartId", auth, findOne);
    cartRoutes.get("/cartAdm/", auth, findAllAdm);
    cartRoutes.delete("/cart/:cartId/remove", auth, remove);
    cartRoutes.post("/cart/:cartId/restore", auth, restore);

    return cartRoutes;
  }
}

module.exports = new CartRouter();
