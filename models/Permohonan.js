"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permohonan extends Model {
    static associate(models) {
      Permohonan.belongsTo(models.Ktp, { foreignKey: "ktpid", as: "Ktp" });
      Permohonan.belongsTo(models.Rab, { foreignKey: "rabid", as: "Rab" });
      Permohonan.belongsTo(models.Proposal, {
        foreignKey: "proposalid",
        as: "Proposal",
      });
      Permohonan.belongsTo(models.Kategori, {
        foreignKey: "kategoriid",
        as: "Kategori",
      });
      Permohonan.belongsTo(models.Keagamaan, {
        foreignKey: "keagamaanid",
        as: "Keagamaan",
      });
      Permohonan.belongsTo(models.Status, {
        foreignKey: "statusid",
        as: "Status",
      });
    }
  }
  Permohonan.init(
    {
      userid: DataTypes.BIGINT,
      nama: DataTypes.STRING,
      notelpon: DataTypes.STRING,
      keagamaanid: DataTypes.INTEGER,
      pengajuandana: DataTypes.DOUBLE,
      tujuan: DataTypes.STRING,
      norek: DataTypes.STRING,
      statusid: DataTypes.INTEGER,
      keterangan: DataTypes.STRING,
      kategoriid: DataTypes.INTEGER,
      ktpid: DataTypes.INTEGER,
      proposalid: DataTypes.INTEGER,
      rabid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Permohonan",
      tableName: "permohonans",
      timestamps: true,
    }
  );
  return Permohonan;
};
