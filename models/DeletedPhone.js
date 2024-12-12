const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DeletedPhone = sequelize.define('DeletedPhone', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = DeletedPhone;
