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
import { PatientResolver } from './resolvers/PatientResolver';
import path from 'path'

import dbConfig from './ormconfig'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import { AuthResolver } from './resolvers/AuthResolver';


const mailerOptions = {
		host: "smtp:ethereal.email",
		port: 587,
		secure: false,
}



const main = async () => {
  const conn = await createConnection(dbConfig);

  // await conn.dropDatabase();
  await conn.runMigrations();

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()


	let testAccount = await nodemailer.createTestAccount();
	let mailer = nodemailer.createTransport({
		...mailerOptions,
		auth: { user: testAccount.user, pass: testAccount.pass }
	})

  app.use( cors({ origin: 'http://localhost:3000' , credentials: true }))

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
      },
      secret: 'somesecret',
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PatientResolver, AuthResolver

      ],
      validate: false
    }),
    context: ({ req, res}) => ({
      req , res, redis, mailer
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('localhost:4000');
  })

};

main().catch( err => console.log(err));
