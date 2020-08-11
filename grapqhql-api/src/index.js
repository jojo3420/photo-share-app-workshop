const { ApolloServer } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const path = require('path');

const typeDefs = `
  scalar DateTime

  type User {
    githubLogin: ID!
    name: String!
    avatarURL: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
    
  }
  type Photo {
    id: ID!
    title: String!
    url: String!
    description: String
    category: PhotoCategory
    postedBy: User!
    taggedUsers: [User!]!
    created: DateTime!
  }
  enum PhotoCategory {
    """ 셀카 """
    SELFIE 
    
    """ 초상화 """
    PORTRAIT
      
    """ 작업 """
    ACTION
    
    """ 풍경 """
    LANDSCAPE
    
    """ 그래픽 """
    GRAPHIC
  }
  
  input PostPhotoInput {
    title: String!
    description: String 
    category: PhotoCategory = PORTRAIT
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
    
    totalUsers: Int!
    allUsers: [User!]!
  }
  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log('server is listening port: 4000');
});
