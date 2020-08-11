const { GraphQLScalarType } = require('graphql');

const Type = {
  Photo: {
    url: (parent) => {
      return `http://yoursite.com/img/${parent.id}`;
    },
    postedBy: (parent) => {},
    taggedUsers: (parent) => {
      // 최종적으로 해당 포토에 태그된 유저 목록을 리턴한다.
    },
  },
  User: {
    postedPhotos: (parent) => {},
    inPhotos: (parent) => {
      // 최종적 으로 해당 유저가 태그된 포토 목록을 리턴한다.
    },
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value',
    // 2. 쿼리 인자값을 js Date 타입으로 파싱 한다.
    parseValue: (value) => new Date(value),
    // 3. 값일 내 보낼때 ISO 변환 후 내 보낸다.
    serialize: (value) => new Date(value).toISOString(),
    // 1. (옵션)파싱전에 인자값 을 가져 오거나 (인자가 리터럴 일 경우!)
    parseLiteral: (ast) => ast.value,
  }),
};

module.exports = Type;
