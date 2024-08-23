'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      mobile: DataTypes.INTEGER,
      password: DataTypes.STRING,
      age: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        values: ['male', 'female', 'other'],
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
