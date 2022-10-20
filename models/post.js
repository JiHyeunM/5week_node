'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      // define association here
    }
  }
  Post.init({
    postId: {
              type :DataTypes.INTEGER,
              primaryKey:true
            },
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: {type: DataTypes.INTEGER,
          defaultValue: 0},
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Post;
};