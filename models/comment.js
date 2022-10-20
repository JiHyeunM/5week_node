'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
    }
  }
  comment.init({
    commentId: {type:DataTypes.STRING,
                primaryKey:true},
    postId: {
      type :DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    comment: DataTypes.STRING,
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comment;
};