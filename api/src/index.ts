import express from 'express';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import 'reflect-metadata'
import { __prod__ } from "./constants";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import dbConfig from './ormconfig'
import { UserResolver } from './resolvers/UserResolver';
import path from 'path'

const main = async () => {
  const conn = await createConnection(
    {
      type: 'postgres' ,
      // process.env.DATABASE_TYPE,
      host: 'localhost',
      port: 5432,
      logging: true,
      username: 'super_isa',
      password: 'pass',
      database: 'isa',
      synchronize: !!process.env.ORM_SYNC,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: [path.join(__dirname, "./entities/*")],
    });

  await conn.runMigrations();

  const app = express()
  const RedisStore = connectRedis(session)
  // const redis = new Redis(process.env.REDIS_URL)
  const redisClient = redis.createClient()
  app.set("proxy", 1)
  app.use( cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

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
        sameSite: 'lax',
        secure: __prod__,
        domain: __prod__ ? process.env.DOMAIN : undefined
      },
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver ],
      validate: false
    }),
    context: ({ req, res}) => ({
      req , res, redis
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log('localhost');
  })

};

main().catch( err => console.log(err));
