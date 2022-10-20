const PostRepository = require('../../../repositories/posts.repository')

//
const mockPostModel = ()=>({
    findAll : jest.fn(),
    create : jest.fn(),
    findByPk : jest.fn(),
    update : jest.fn(),
    destroy : jest.fn(),
})
//describe 설명하다
describe("PostreRository Layer Text",() => {
//인스턴스화 시킴
    let postrepository = new PostRepository()
    //시퀄라이즈 모델을 모킹함
    postrepository.post = mockPostModel()

    beforeEach(()=>{
    //모든mock을 리셋한다.
        jest.resetAllMocks()
    })

    test("포스트레포 안에 있는 getAll Method",async ()=>{
    //postrepository안에 있는 getAllposts를 실행해서 반환해주는걸 테스트
        const findAllPostsresult =
            {
                "postId": 8,
                "userId": 2,
                "nickname": "Developer",
                "title": "안녕하세요 2번째 게시글 제목입니다.",
                "createdAt": "2022-08-04T14:45:40.000Z",
                "updatedAt": "2022-08-04T14:45:40.000Z",
                "likes": 0
            }
    postrepository.post.findAll = jest.fn(()=>{
        return findAllPostsresult
    })

    const posts = await postrepository.findAllPosts({})

    // console.log(postrepository.findAllPosts.findAll)
    expect(postrepository.post.findAll)
    .toHaveBeenCalledTimes(1)
    // console.log(postrepository.findAllPosts.findAll)
    //1. findALL 몇번 실행됨?
    // expect(postrepository.findAllPosts.findAll).toBeCalledTimes(1)
    //실행하는 검증코드

    //2. posts가 findAllPosts과 동일한가
    })

})









// 민형님이 쓰신 코드

const { Users, Posts, Comments } = require('../models');
const CommentsRepository = require('../repositories/comments.repository');
const commentsRepository = new CommentsRepository();

const post = {
  postId: 1,
  userId: 6,
  title: '게시글 수정하기!!!',
  content: 'asdfasga',
  likesCount: 0,
  createdAt: '2022-10-20T06:17:49.000Z',
  updatedAt: '2022-10-20T06:18:29.000Z',
};

const comment = {
  commentId: 3,
  postId: 1,
  userId: 6,
  comment: 'asdfasga',
  createdAt: '2022-10-20T06:17:49.000Z',
  updatedAt: '2022-10-20T06:18:29.000Z',
};

Posts.findByPk = jest.fn((postId) => {
  if (postId === post.postId) return post;
  else return;
});

Comments.findByPk = jest.fn((commentId) => {
  if (commentId === comment.commentId) return comment;
  else return;
});

test('findThePost 메소드에 존재하는 postId를 전달하면 그 postId를 가지는 post가 리턴된다', async () => {
  let postId = 1;
  const result = await commentsRepository.findThePost(postId);
  expect(Posts.findByPk).toBeCalledWith(postId);
  expect(result).toEqual(post);
});

test('findThePost 메소드에 존재하지 않는 postId를 전달하면 undefined가 리턴된다', async () => {
  let postId = 2;
  const result = await commentsRepository.findThePost(postId);
  expect(Posts.findByPk).toBeCalledWith(postId);
  expect(result).toBeUndefined();
});

test('findTheComment 메소드에 존재하는 commentId를 전달하면 그 commentId를 가지는 comment가 리턴된다', async () => {
  let commentId = 3;
  const result = await commentsRepository.findTheComment(commentId);
  expect(Comments.findByPk).toBeCalledWith(commentId);
  expect(result).toEqual(comment);
});

test('CommentsRepository 의 findThePost 메소드에 존재하지 않는 commentId를 전달하면 undefined가 리턴된다', async () => {
  let commentId = 1;
  const result = await commentsRepository.findTheComment(commentId);
  expect(Comments.findByPk).toBeCalledWith(commentId);
  expect(result).toBeUndefined();
});
