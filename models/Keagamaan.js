"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keagamaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Keagamaan.belongsTo(models.Kategori, {
        foreignKey: "kategoriid",
        as: "Kategori",
      });
    }
  }
  Keagamaan.init(
    {
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      wilayah: DataTypes.STRING,
      kategoriid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Keagamaan",
      tableName: "keagamaans",
      timestamps: true,
    }
  );
  return Keagamaan;
};
