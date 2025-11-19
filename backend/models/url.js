const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Url = sequelize.define("Url", {
  longUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Url;
