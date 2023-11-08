"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Burek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Burek.hasOne(models.Permohonan, {
        foreignKey: "burekid",
        as: "Permohonan",
      });
    }
  }
  Burek.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Burek",
      tableName: "bureks",
      timestamps: true,
    }
  );
  return Burek;
};
