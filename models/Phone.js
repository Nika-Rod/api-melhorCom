const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Produto = sequelize.define('Produto', {
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
    startDate: {
      type: DataTypes.DATE, 
      allowNull: false, 
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    code: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true, 
    },
  });

module.exports = Produto;
