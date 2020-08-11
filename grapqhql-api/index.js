const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const resolvers = require('./resolvers/index');
const { readFileSync } = require('fs');

// env
require(`dotenv`).config();

// 'UTF-8' encoding 중요!
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');

async function run() {
  const app = express();
  const MONGO_DB = process.env.DB_HOST;
  let db;
  // console.log({ MONGO_DB });
  try {
    const client = await MongoClient.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db();
  } catch (e) {
    console.log(`
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...
    `);
  }

  const context = { db };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  // apply express
  server.applyMiddleware({ app });

  // playground router
  app.get('/playground', expressPlayground({ endpoint: '/resolvers' }));

  // home
  app.get('/', (req, res) => {
    let url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`;
    res.end(`<a href="${url}">Sign In with Github</a>`);
  });

  app.listen({ port: 4000 }, (err) => {
    if (err) {
      console.log(`
       server error ${err.toString()}
      `);
    }
    console.log(
      `GraphQL Server running at http://localhost:4000${server.graphqlPath}`,
    );
  });
}

run();
