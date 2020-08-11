const { GraphQLScalarType } = require('graphql');
const { photos, tags, users } = require('./db');


let _id = 5;

const resolvers = {
  Query: {
    /* User */
    totalUsers: (_, props) => users.length,
    allUsers: (_, props) => users,

    /* Photo */
    totalPhotos: (parent, props) => photos.length,
    allPhotos: (_, props) => photos,
  },
  Mutation: {
    postPhoto: (parent, props) => {
      // console.log({ parent });
      const photo = {
        id: _id.toString(),
        ...props.input,
        created: new Date(),
        githubUser: 'jojo' // @TODO: 작성자 임시로 하드 코딩
      };
      // console.log({ photo })
      photos.push(photo);
      _id = _id + 1;
      return photo;
    },
  },
  Photo: {
    url: (parent) => {
      // console.log({ parent }); // parent is Photo object
      return `http://yoursite.com/img/${parent.id}`;
    },
    postedBy: (parent) => {
      // console.log({ parent });
      const user = users.find((user) => user.githubLogin === parent.githubUser);
      // console.log({ user });
      return user;
    },
    taggedUsers: (parent) => {  // parent is photo
      return tags
        // 전체 태그 목록에서 현재 사진의 태그만 추린다.
        .filter(tag => tag.photoID === parent.id)
        // 추린 태그 목록에서 유저 아이디로만 되어있는 배열을 만든 후.
        .map(tag => tag.userID)
        // 이 유저 아이디 배열과 일치 하는 유저 목록을  만든다.
        .map(userID => users.find(user => user.githubLogin === userID))
      // 최종적으로 해당 포토에 태그된 유저 목록을 리턴한다.
    },
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((photo) => photo.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) => { // parent is user
      return tags
        // 전체 태그 목록 에서 일단 현재 유저의 태그 목록만 추린다.
        .filter(tag => tag.userID === parent.githubLogin)
        // 추린 태그 목록으로  포토 아이디 로만 구성된 베열을 만든 후
        .map(tag => tag.photoID)
        //  포토 아이디 배열의 값과 일치 하는 포토들만 필터링 한다.
        .map(photoID => photos.find(photo => photo.id === photoID))
      // 최종적 으로 해당 유저가 태그된 포토 목록을 리턴한다.
    }
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: "A valid date time value",
    // 2. 쿼리 인자값을 js Date 타입으로 파싱 한다.
    parseValue: value => new Date(value),
    // 3. 값일 내 보낼때 ISO 변환 후 내 보낸다.
    serialize: value => new Date(value).toISOString(),
    // 1. (옵션)파싱전에 인자값 을 가져 오거나 (인자가 리터럴 일 경우!)
    parseLiteral: ast => ast.value,
  }),
};

module.exports = resolvers;
