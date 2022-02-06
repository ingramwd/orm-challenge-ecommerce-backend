// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
const { Category } = require('.');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isInt: function (num) {
          //validating the input is a number
          if (typeof num == "number") {
            return Number.isInteger(num);
          } else {
            return false
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
