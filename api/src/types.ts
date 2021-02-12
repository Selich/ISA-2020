import { Request, Response} from 'express'
import { Redis } from 'ioredis';
import nodemailer from 'nodemailer'

export type MyContext = {
  redis: Redis,
  // @ts-ignore
  req: Request & { session: Express.Session },
  res: Response,
	mailer: nodemailer.Transport
}
