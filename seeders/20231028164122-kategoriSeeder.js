"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("kategoris", [
      { nama: "LEMBAGA KEAGAMAAN" },
      { nama: "RUMAH IBADAH" },
      // Tambahkan data lain sesuai kebutuhan Anda
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("kategoris", null, {});
  },
};
