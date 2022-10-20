const PostRepository = require('../repositories/posts.repository'); 

class PostService {
  // 멤버변수 postRepository = PostRepository클래스를 만든 인스턴스다
  postRepository = new PostRepository(); // DB안에 있는 정보를 사용하기 위해서는 레파지토리에 있는 것을 통해서 사용하게 돼 있음

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map(post => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes
      }
    });
  }

  findPostById = async(postId)=>{
    const findPost = await this.postRepository.findPostById(postId)
    return{
        postId: findPost.postId,
        userId: findPost.userId,
        nickname: findPost.nickname,
        title: findPost.title,
        content: findPost.content,
        createdAt: findPost.createdAt,
        updatedAt: findPost.updatedAt,
        // likes: findPost.likes
    }
  }

  createPost = async (userId, nickname, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(userId, nickname, title, content);
    // console.log(createPostData.userId)
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.null,
      userId: createPostData.userId,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt
    };
  }

  updatePost = async (postId, title, content)=>{
    const findPost = await this.postRepository.findPostById(postId)
    if(!findPost)throw new Error("Post doesn't exits")

    await this.postRepository.updatePost(postId, title, content)

    const updatePost = await this.postRepository.findPostById(postId)
    return {
        title: updatePost.title,
        content: updatePost.content,
        createdAt: updatePost.createdAt,
        updatedAt: updatePost.updatedAt,
    }
  }

  deletePost = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deletePost(postId);

    return
  };

}

module.exports = PostService;