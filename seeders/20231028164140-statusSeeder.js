"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("statuses", [
      { nama: "DISETUJUI" },
      { nama: "DITOLAK" },
      { nama: "PROSES" },
      // Tambahkan data lain sesuai kebutuhan Anda
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("statuses", null, {});
  },
};
