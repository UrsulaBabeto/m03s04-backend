"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMERIC(2),
        allowNull: false,
      },
      logoUrl: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      created_at:Sequelize.DATE,
      updated_at:Sequelize.DATE,
      deleted_at:Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('products');
     
  },
};
