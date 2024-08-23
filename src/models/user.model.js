'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        unique: true,  
        allowNull: false,
      } ,
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female','others'],
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};