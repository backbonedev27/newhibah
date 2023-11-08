"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suratpermohonan extends Model {
    static associate(models) {
      Suratpermohonan.hasOne(models.Permohonan, {
        foreignKey: "suratpermohonanid",
        as: "Permohonan",
      });
    }
  }
  Suratpermohonan.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suratpermohonan",
      tableName: "suratpermohonans",
      timestamps: true,
    }
  );
  return Suratpermohonan;
};
