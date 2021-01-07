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

import dbConfig from './ormconfig'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import { AuthResolver } from './resolvers/AuthResolver';
import { Employee } from './entities/Employee';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { EPrescriptionResolver } from './resolvers/EPrescriptionResolver';
import Patient from './entities/Patient';
import { Prescription } from './entities/Prescription';
import { Appointment } from './entities/Appointment';
import { Pharmacy } from './entities/Pharmacy';
import { Address } from './entities/Address';


const mailerOptions = {
		host: "smtp:ethereal.email",
		port: 587,
		secure: false,
}




const main = async () => {
  const conn = await createConnection(dbConfig);


  const address = await Address.save(new Address({
    street: "poenkareova 22", city: "city", country:"country"
  }))

  const employee = await Employee.save(new Employee({
    email: 'derm@gmail', password: 'pass', firstName: 'Nikola', lastName: 'Selic'
  }))

  const patient = await Patient.save(new Patient({
    email: 'user@gmail', password: 'pass', firstName: 'Nikola', lastName: 'Selic'
  }))

  const pharmacy = await Pharmacy.save(new Pharmacy({
    address, name: "Pharmacy 1"
  }))

  const appointment = await Appointment.save(new Appointment({
    patient, employee, pharmacy,
    from: new Date("12/12/2012 13:14"),
    until: new Date("12/12/2012 14:14"),
  }))

  const prescription = await Prescription.save(new Prescription({
    patient,
    employee,
    appointment,
    type: "eprescription",
    isUsed: false,
    deadline: null
  }))





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
        PatientResolver, AuthResolver, EmployeeResolver, EPrescriptionResolver,

      ],
      validate: false
    }),
    context: ({ req, res }) => ({
      req , res, redis, mailer
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('localhost:4000');
  })

};

main().catch( err => console.log(err));
