"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asetrekom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asetrekom.hasOne(models.Permohonan, {
        foreignKey: "asetrekomid",
        as: "Permohonan",
      });
    }
  }
  Asetrekom.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Asetrekom",
      tableName: "asetrekoms",
      timestamps: true,
    }
  );
  return Asetrekom;
};
