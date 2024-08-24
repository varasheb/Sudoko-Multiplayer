'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    static associate(models) {}
  }
  Games.init(
    {
      boardId: {
       type: DataTypes.STRING,
       primaryKey:true,
       allowNull:false
      },
      createdBy:DataTypes.STRING,
      board:  {
          type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)), 
          allowNull: true
        },
      moveBy:{
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: []
        }
    },
    {
      sequelize,
      modelName: 'Games'
    }
  );
  return Games; 
};

