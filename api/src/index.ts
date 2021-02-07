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
import mg from 'nodemailer-mailgun-transport'
import { AuthResolver } from './resolvers/AuthResolver';
import { AppointmentResolver } from './resolvers/AppointmentResolver';
import { Employee } from './entities/Employee';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { EPrescriptionResolver } from './resolvers/EPrescriptionResolver';
import Patient from './entities/Patient';
import { Prescription } from './entities/Prescription';
import { Appointment } from './entities/Appointment';
import { Pharmacy } from './entities/Pharmacy';
import { Address } from './entities/Address';
import { MedicineResolver } from './resolvers/MedicineResolver';
import {PharmacyResolver} from './resolvers/PharmacyResolver';
import jsQR from 'jsqr'
import sizeOf from 'image-size'
import jimp from 'jimp'


const mailerOptions = {
		host: "smtp:ethereal.email",
		port: 587,
		secure: false,
}


const main = async () => {
  const conn = await createConnection(dbConfig);

  // conn.dropDatabase()
  conn.runMigrations()


  const app = express()
  const RedisStore = connectRedis(session)
	const redis = new Redis('127.0.0.1:6379');



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

	app.use(fileUpload({
		createParentPath: true
	}))

  app.use( cors({ origin: 'http://localhost:3000' , credentials: true }))

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(morgan("dev"))

	app.post('/eprescriptions', async(req,res) => {
		try {
			if(!req.files) {
				res.send({
					status: false, 
					message:'no files'
				})
			} else {
				const {img} = req.files

				//@ts-ignore
				img.mv('./uploads/' + img.name)
				//@ts-ignore
				console.log('file uploaded: ' + img.name)

				//@ts-ignore
				//
				QrScanner.scanImage('./uploads/' + img.name)
					.then(ress => 
							res.send({
								status: true,
								message: ress
							})
					)
				.catch(e => console.log(e))


				//@ts-ignore
				//@ts-ignore
				/*
				const code = jsQR(img, dimensions.width, dimensions.height)
				if(!code) {
					res.send({
						status: false,
						//@ts-ignore
						message: 'cannot parse the code'
					})
					return

				}
				*/

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
      },
      secret: 'somesecret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ PatientResolver, EmployeeResolver, MedicineResolver, AuthResolver, PharmacyResolver, AppointmentResolver],
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
