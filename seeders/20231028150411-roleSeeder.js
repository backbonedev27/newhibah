"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      { nama: "ADMIN" },
      { nama: "USER" },
      // Tambahkan data lain sesuai kebutuhan Anda
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
