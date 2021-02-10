import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import 'reflect-metadata'
import { __prod__ } from "./constants";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { PatientResolver } from './resolvers/PatientResolver';
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import dbConfig from './ormconfig'
import nodemailer from 'nodemailer'
import { AuthResolver } from './resolvers/AuthResolver';
import { AppointmentResolver } from './resolvers/AppointmentResolver';
import { Employee } from './entities/Employee';
import { Tier } from './entities/Tier';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { MedicineResolver } from './resolvers/MedicineResolver';
import {PharmacyResolver} from './resolvers/PharmacyResolver';

const main = async () => {
  const conn = await createConnection(
    {
      ...dbConfig,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: [path.join(__dirname, "./entities/*")],
    });

  await conn.runMigrations();

	let sysadmin = new Employee() 
	sysadmin.email = 'sysadmin@mail'
	sysadmin.password = 'admin'
	sysadmin.role = 'sysadmin'
	await Employee.save(sysadmin)

	/*
	let regular = new Tier() 
	regular.name = 'Regular'
	regular.discount = 0
	regular.scoreMin = 0
	regular.scoreMax = 14
	await Tier.save(regular)

	let silver = new Tier() 
	silver.name = 'Silver'
	silver.discount = 20
	silver.scoreMin = 15
	silver.scoreMax = 29
	await Tier.save(silver)

	let gold = new Tier() 
	gold.name = 'Gold'
	gold.discount = 30
	gold.scoreMin = 30
	gold.scoreMax = 999
	await Tier.save(gold)
	*/

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
