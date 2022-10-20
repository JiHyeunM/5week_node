const LikesService = require("../services/likes.service")

class LikesController {
    likesService = new LikesService();

    putLikes = async(req,res,next)=>{
        const {userId} = res.locals.user
        const {postId} = req.params;
        console.log(postId,userId);
        const like = await this.likesService.likePost(postId, userId)
        res.status(201).send(like)
    }
    
    getLikes = async(req,res)=>{
        const {userId} = res.locals.user
        const like_list = await this.likesService.likeList(userId)
        res.status(200).send(like_list)
    }
}

module.exports = LikesController;