const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.findAllPost();

    return res.status(200).json({ data: posts })
  }

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);
    // if(!post) res.status(400).send({errorMessage:"게시물이 존재하지 않습니다"})

    return res.status(200).json({ data: post});
  }

  createPost = async (req, res, next) => {
    try{
      // console.log(res.locals.user)
      const {user} = res.locals;
      const { title, content } = req.body; 
      if(!title || !content){
        res.status(400).send({msg:"게시글 내용을 작성해주세요"})
      }
      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postService.createPost(user.userId, user.nickname, title, content);
      res.status(201).json({data : createPostData});
    }catch(error){
      console.log(error)
      res.status(400).send({errorMessage : "게시글 작성에 실패하였습니다" })
    }
  }

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      title,
      content
    );

    res.status(200).json({ data: updatePost });
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    const deletePost = await this.postService.deletePost(postId);

    res.status(200).json({ data: deletePost, msg:"게시글이 삭제되었습니다" });
  };
}

module.exports = PostsController;