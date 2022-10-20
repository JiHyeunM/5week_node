const LikesRepository = require("../repositories/likes.repository")

class LikesService {
    likesrepository = new LikesRepository();

    likePost = async(postId, userId)=>{
        // 찾고
        const Like = await this.likesrepository.findPost(postId, userId)
        if(!Like){
            // 만드는 것
            const createLikes = await this.likesrepository.createdLike(postId, userId)
            // 해주고
            const Likes = await this.likesrepository.inLike(postId)
            // Likes;
            // createLikes;
            return {msg:"좋아요 등록"}
        }else{
            // 지우는 것
            const destroyLikes = await this.likesrepository.destroyLike(postId, userId)
            // 빼주고
            const unLikes = await this.likesrepository.deLike(postId)
            // unLikes;
            // destroyLikes;
            return {msg:"좋아요 취소"}
        }
    }

    likeList = async(postId)=>{
        const likeUser = await this.likesrepository.findPosts(postId)

        // const LikeList = await likeUser.map((post)=>{
        //     return{
        //         postId : post.postId,
        //         userId : post.userId,
        //         nickname : post.nickname,
        //         title : post.title,
        //         createdAt  : post.createdAt,
        //         updatedAt : post.updatedAt,
        //         likes : post.likes
        //     }
        // })
        // return LikeList

        likeUser.map((post)=>post.postId)
        const data=[]
        for(const postId of likeUser){
            const poli = await this.likesrepository.findPosts(postId)
            const postList = {
                postId : poli.postId,
                userId : poli.userId,
                nickname : poli.nickname,
                title : poli.title,
                createdAt  : poli.createdAt,
                updatedAt : poli.updatedAt,
                likes : poli.likes
            }
            data.push(postList)
        }
    }
}

module.exports = LikesService;