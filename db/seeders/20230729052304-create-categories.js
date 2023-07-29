"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     
    */

    await queryInterface.bulkInsert("categories", [
      {
        name: "Raining",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Sunny",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Snowing",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Cloudy",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]),
      await queryInterface.bulkInsert("sighting_categories", [
        {
          sighting_id: 1,
          category_id: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          sighting_id: 2,
          category_id: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          sighting_id: 3,
          category_id: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          sighting_id: 4,
          category_id: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sighting_categories", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};
