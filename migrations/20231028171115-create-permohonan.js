"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Permohonans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.BIGINT,
      },
      nama: {
        type: Sequelize.STRING,
      },
      notelpon: {
        type: Sequelize.STRING,
      },
      keagamaanid: {
        type: Sequelize.INTEGER,
      },
      pengajuandana: {
        type: Sequelize.DOUBLE,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      norek: {
        type: Sequelize.STRING,
      },
      statusid: {
        type: Sequelize.INTEGER,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      kategoriid: {
        type: Sequelize.INTEGER,
      },
      ktpid: {
        type: Sequelize.INTEGER,
      },
      proposalid: {
        type: Sequelize.INTEGER,
      },
      rabid: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Permohonans");
  },
};
