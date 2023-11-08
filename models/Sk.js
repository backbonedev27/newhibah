"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sk.hasOne(models.Permohonan, { foreignKey: "skid", as: "Permohonan" });
    }
  }
  Sk.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sk",
      tableName: "sks",
      timestamps: true,
    }
  );
  return Sk;
};
