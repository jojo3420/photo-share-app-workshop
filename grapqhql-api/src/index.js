const { ApolloServer } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const { readFileSync } = require('fs');

// 'UTF-8' encoding 중요!
const schema = readFileSync(`${__dirname}/graphql/schema.graphql`, 'UTF-8');
// console.log({ schema });
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.listen().then(() => {
  console.log('server is listening port: 4000');
});
