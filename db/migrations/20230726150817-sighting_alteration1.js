"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "sightings",
      "locationDescription",
      "locationdescription"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "sightings",
      "locationdescription",
      "locationDescription"
    );
  },
};
