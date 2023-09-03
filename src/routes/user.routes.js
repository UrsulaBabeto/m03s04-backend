const {
  create,
  findAll,
  findOne,
  login,
  findCarts,
} = require("../controller/user.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");

class UserRouter {
  routesFromUser() {
    const userRoutes = Router();
    userRoutes.post("/users", create);
    userRoutes.get("/users", auth, findAll);
    userRoutes.get("/users/:userId", auth, findOne);
    userRoutes.post("/users/login", auth, login);
    userRoutes.get("/users/:userId/carts", auth, findCarts);

    return userRoutes;
  }
}

module.exports = new UserRouter();
