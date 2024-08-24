'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey:true,
      },
      username: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
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