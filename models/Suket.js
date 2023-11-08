"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suket.hasOne(models.Permohonan, {
        foreignKey: "suketid",
        as: "Permohonan",
      });
    }
  }
  Suket.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suket",
      tableName: "sukets",
      timestamps: true,
    }
  );
  return Suket;
};
