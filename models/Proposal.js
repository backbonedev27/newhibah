"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proposal.hasOne(models.Permohonan, {
        foreignKey: "proposalid",
        as: "Permohonan",
      });
    }
  }
  Proposal.init(
    {
      namafile: DataTypes.STRING,
      size: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Proposal",
      tableName: "proposals",
      timestamps: true,
    }
  );
  return Proposal;
};
