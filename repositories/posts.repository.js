// repositories/posts.repository.js

const { Posts } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();
    return posts;
  }

  findPostById = async (postId)=>{
    const post = await Posts.findByPk(postId);
    return post;
  }

  createPost = async (userId, nickname, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({userId, nickname, title, content });
    return createPostData;
  }

  updatePost = async(postId, title, content)=>{
    const updatePostData = await Posts.update({title,content},{where:{postId}})
    return updatePostData;
  }

  deletePost = async(postId)=>{
    const deletePostData = await Posts.destroy({where:{postId}})
    return deletePostData;
  }
}

module.exports = PostRepository;