"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
    });
    await queryInterface.renameColumn(
      "sightings",
      "location",
      "locationDescription"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sightings", "city");
    await queryInterface.removeColumn("sightings", "country");
    await queryInterface.renameColumn(
      "sightings",
      "locationDescription",
      "location"
    );
  },
};
