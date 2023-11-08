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

      keagamaanid: {
        type: Sequelize.BIGINT,
      },
      statusid: {
        type: Sequelize.INTEGER,
      },
      prosesid: {
        type: Sequelize.INTEGER,
      },
      pengajuandana: {
        type: Sequelize.STRING,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      norek: {
        type: Sequelize.STRING,
      },
      skid: {
        type: Sequelize.INTEGER,
      },
      ktpid: {
        type: Sequelize.INTEGER,
      },
      suratpermohonanid: {
        type: Sequelize.INTEGER,
      },
      asetrekomid: {
        type: Sequelize.INTEGER,
      },
      suketid: {
        type: Sequelize.INTEGER,
      },
      burekid: {
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
