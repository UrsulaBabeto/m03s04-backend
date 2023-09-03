const { INTEGER } = require("sequelize");
const { connection } = require("../database/connection");

const ProductCart = connection.define(
  "product_carts",
  {
    productId: {
      type: INTEGER,
      references: {
        model: {
          tableName: "products"
        },
      },
    },
    cartId: {
      type: INTEGER,
      allowNull:false,
      references: {
        model: {
          tableName: "carts"
        },
      },
    },
  },
  { undescored: true, paranoid: true }//paranoid faz uma soft-deletion (não deleta os dados de verdade, adiciona eles em uma coluna chamana deletedAt) , ao invés de hard-deletion
);


module.exports = { ProductCart };
