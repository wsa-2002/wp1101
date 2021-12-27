import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from "./db.js";
import mongo from './mongo.js';
import Mutation from './resolvers/Mutation.js';
import Query from './resolvers/Query.js';
import ChatBox from './resolvers/ChatBox.js';
import Message from './resolvers/Message.js';
import Subscription from './resolvers/Subscription.js';
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: 'schema.graphql',
  resolvers: {
    Mutation,
    Query,
    ChatBox,
    Message,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});


server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
