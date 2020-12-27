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
import { UserResolver } from './resolvers/UserResolver';
import path from 'path'

import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { AppointmentResolver } from './resolvers/AppointmentResolver';
import { HolidayResolver } from './resolvers/HolidayResolver';
import { PharmacyResolver } from './resolvers/PharmacyResolver';
import { CalendarResolver } from './resolvers/CalendarResolver';
import { MedicineRequestResolver } from './resolvers/MedicineRequestResolver';
import dbConfig from './ormconfig'
import { AppointmentDefinitionResolver } from './resolvers/AppointmentDefinitionResolver';
import { MedicineResolver } from './resolvers/MedicineResolver';
import { PriceResolver } from './resolvers/PriceResolver';
import { TierResolver } from './resolvers/TierResolver';

const main = async () => {
  const conn = await createConnection(dbConfig);

  await conn.runMigrations();

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

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
        UserResolver, CalendarResolver, AppointmentResolver,
        HolidayResolver, EmployeeResolver, MedicineRequestResolver, PharmacyResolver,
        AppointmentDefinitionResolver, MedicineResolver, PriceResolver, TierResolver
      ],
      validate: false
    }),
    context: ({ req, res}) => ({
      req , res, redis
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('localhost:4000');
  })

};

main().catch( err => console.log(err));
