import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from './mikro-orm.config';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from "./resolvers/user";
import { RegisterInput } from "./resolvers/types/UserTypes";
import { User } from "./entities/User";
import { MedicineResolver } from "./resolvers/medicine";
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import {createConnection} from 'typeorm';
import 'reflect-metadata'
import path from "path";
import {createUserLoader} from './utils/createUserLoader'
import { Medicine } from "./entities/Medicine";
import { Address } from "./entities/Address";
import { PatientDetails } from "./entities/PatientDetails";




const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    logging: true,
    username: 'super_isa',
    password: 'pass',
    database: 'isa',
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      // __dirname + "./src/entities/*.ts"
      User, Medicine, Address, PatientDetails
    ],
  });

  await conn.runMigrations();

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

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
        // csrf
        sameSite: 'lax'
      },
      // make to env var
      secret: 'somesecret',
      resave: false
    })
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MedicineResolver],
      validate: false
    }),
    context: ({ req, res}) => ({ req , res, redis,
      userLoader : createUserLoader  })

  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  )

  app.get('/', (req,res) => {
    res.send('test');
  });
  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  })

};


main().catch( err => console.log(err));
