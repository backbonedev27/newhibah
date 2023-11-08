"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rab.hasOne(models.Permohonan, { foreignKey: "rabid", as: "Permohonan" });
    }
  }
  Rab.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rab",
      tableName: "rabs",
      timestamps: true,
    }
  );
  return Rab;
};
