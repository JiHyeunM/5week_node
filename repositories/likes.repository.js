const {Posts, likes} = require("../models")

class LikesRepository {
    findPost = async(postId, userId)=>{
        const Like = await likes.findOne({where:{postId, userId}});
        return Like;
    }

    findPosts = async(postId)=>{
        const Post = await Posts.findOne({where:{postId},attributes: {exclude : ['content']}})
    }

    inLike = async(postId)=>{
        const Likes = await Posts.increment({likes:1},{where:{postId:postId}})
        return Likes;
    }

    createdLike = async(postId, userId)=>{
        const createLikes = await likes.create({postId, userId})
        return createLikes;
    }

    deLike = async(postId)=>{
        const unLikes = await Posts.decrement({likes:1},{where:{postId:postId}})
        return unLikes;
    }

    destroyLike = async(postId,userId)=>{
        const destroyLikes = await likes.destroy({where:{postId,userId}})
        return destroyLikes;
    }

}

module.exports = LikesRepository;