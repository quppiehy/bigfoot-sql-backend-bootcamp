"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("sighting_categories", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("sighting_categories", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
