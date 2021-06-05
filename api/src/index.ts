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


const main = async () => {
  const conn = await createConnection(dbConfig);

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

	app.use(fileUpload({ createParentPath: true }))
  app.use(cors({ origin: 'http://localhost:3000' , credentials: true })) 
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
      },
      secret: 'somesecret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ RateResolver, PatientResolver, EmployeeResolver, MedicineResolver, AuthResolver, PharmacyResolver, AppointmentResolver, ReservationResolver, PrescriptionResolver],
      validate: false
    }),
    context: ({ req, res }) => ({
      req , res, redis, mailer, conn
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  
  app.listen(4000, () => {
    console.log('localhost:4000');
  })

};

main().catch( err => console.log(err));
