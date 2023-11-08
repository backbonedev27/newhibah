"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permohonan extends Model {
    static associate(models) {
      Permohonan.belongsTo(models.Ktp, { foreignKey: "ktpid", as: "Ktp" });
      Permohonan.belongsTo(models.Rab, { foreignKey: "rabid", as: "Rab" });
      Permohonan.belongsTo(models.Suratpermohonan, {
        foreignKey: "suratpermohonanid",
        as: "Suratpermohonan",
      });
      Permohonan.belongsTo(models.Suket, {
        foreignKey: "suketid",
        as: "Suket",
      });
      Permohonan.belongsTo(models.Sk, {
        foreignKey: "skid",
        as: "Sk",
      });
      Permohonan.belongsTo(models.Burek, {
        foreignKey: "burekid",
        as: "Burek",
      });

      Permohonan.belongsTo(models.Asetrekom, {
        foreignKey: "asetrekomid",
        as: "Asetrekom",
      });
      Permohonan.belongsTo(models.Proposal, {
        foreignKey: "proposalid",
        as: "Proposal",
      });

      Permohonan.belongsTo(models.Status, {
        foreignKey: "statusid",
        as: "Status",
      });

      Permohonan.belongsTo(models.Keagamaan, {
        foreignKey: "keagamaanid",
        as: "Keagamaan",
      });

      Permohonan.belongsTo(models.User, {
        foreignKey: "userid",
        as: "User",
      });

      Permohonan.belongsTo(models.Proses, {
        foreignKey: "prosesid",
        as: "Proses",
      });
    }
  }
  Permohonan.init(
    {
      keagamaanid: DataTypes.BIGINT,
      statusid: DataTypes.INTEGER,
      prosesid: DataTypes.INTEGER,
      pengajuandana: DataTypes.STRING,
      tujuan: DataTypes.STRING,
      norek: DataTypes.STRING,
      skid: DataTypes.INTEGER,
      ktpid: DataTypes.INTEGER,
      suratpermohonanid: DataTypes.INTEGER,
      asetrekomid: DataTypes.INTEGER,
      suketid: DataTypes.INTEGER,
      burekid: DataTypes.INTEGER,
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
