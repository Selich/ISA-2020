import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import QrScanner from 'qr-scanner'
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
import { AuthResolver } from './resolvers/auth';
import { AppointmentResolver } from './resolvers/AppointmentResolver';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { ReservationResolver } from './resolvers/ReservationResolver';
import { MedicineResolver } from './resolvers/MedicineResolver';
import { PharmacyResolver } from './resolvers/PharmacyResolver';
import { PrescriptionResolver } from './resolvers/PrescriptionResolver';
import { RateResolver } from './resolvers/RateResolver';

import "dotenv-safe/config"
import { ComplaintResolver } from './resolvers/ComplaintResolver';

export const main = async () => {
  const conn = await createConnection(dbConfig);

  conn.runMigrations()
  

  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis('127.0.0.1:6379');

  // let sysadmin = new Employee()
  // sysadmin.email = 'sys@gmail.com'
  // sysadmin.firstName = 'Admin'
  // sysadmin.lastName = 'Admin'
  // sysadmin.role = 'sysadmin'
  // await Employee.save(sysadmin)

  // let pharm = new Pharmacy()
  // pharm.name = 'Apoteka #1'
  // // @ts-ignore
  // pharm.address = {
  //   street: 'Bulevar despota Stefana',
  //   city: 'Novi Sad',
  //   country: 'Serbia'
  // }
  // await Pharmacy.save(pharm)

  // let regular = new Tier()
  // regular.name = 'Regular'
  // regular.discount = 0
  // regular.scoreMin = 0
  // regular.scoreMax = 14
  // await Tier.save(regular)
  // let silver = new Tier()
  // silver.name = 'Silver'
  // silver.discount = 20
  // silver.scoreMin = 15
  // silver.scoreMax = 29
  // await Tier.save(silver)
  // let gold = new Tier()
  // gold.name = 'Gold'
  // gold.discount = 30
  // gold.scoreMin = 30
  // gold.scoreMax = 999
  // await Tier.save(gold)


  let testAccount = await nodemailer.createTestAccount();

  let mailer = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'barry85@ethereal.email',
      pass: '4GK92dcVH8byXMht53'
    }
  })

  app.use(fileUpload({ createParentPath: true }))
  app.set('trust proxy', 1)
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan("dev"))

  app.post('/eprescriptions', async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: 'no files'
        })
      } else {
        const { img } = req.files

        //@ts-ignore
        img.mv('./uploads/' + img.name)
        //@ts-ignore
        console.log('file uploaded: ' + img.name)

        //@ts-ignore
        QrScanner.scanImage('./uploads/' + img.name)
          .then(ress =>
            res.send({
              status: true,
              message: ress
            })
          )
          .catch(e => console.log(e))
        // .decrypt list of medicine ids


      }
    } catch (e) {
      res.status(500)
    }
  })

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__,
      },
      secret: 'somesecret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    // @ts-ignore
    schema: await buildSchema({
      resolvers: [ComplaintResolver, RateResolver, PatientResolver, EmployeeResolver, MedicineResolver, AuthResolver, PharmacyResolver, AppointmentResolver, ReservationResolver, PrescriptionResolver],
      validate: false
    }),
    // @ts-ignore
    context: ({ req, res }) => ({
      req, res, redis, mailer, conn
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log('localhost:4000');
  })

};

main().catch(err => console.log(err));
