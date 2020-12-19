import express from 'express';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import path from "path";
import 'reflect-metadata'

import { __prod__ } from "./constants";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { createUserLoader } from './utils/createUserLoader'
import dbConfig from './typeorm.config'
import { UserResolver } from './resolvers/UserResolver';

const main = async () => {
  const conn = await createConnection(dbConfig);

  await conn.runMigrations();

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  app.use( cors({ origin: "http://localhost:3000", credentials: true }))

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax'
      },
      secret: 'somesecret',
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver ],
      validate: false
    }),
    context: ({ req, res}) => ({
      req , res, redis,
      userLoader : createUserLoader
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // app.use(cors())

  app.listen(4000, () => { console.log(''); })

};

main().catch( err => console.log(err));
