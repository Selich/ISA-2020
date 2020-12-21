import express from 'express';
import cors from 'cors';
import 'reflect-metadata'

import { __prod__ } from "./constants";
import { createConnection } from 'typeorm';
import dbConfig from './typeorm.config'
import { Appointment } from './entities/Appointment';

const main = async () => {
  const conn = await createConnection(dbConfig);

  const app = express()
  app.use( cors({ origin: "http://localhost:4000", credentials: true }))
  app.get('/appointment', (req, res) => {
    conn.getRepository(Appointment)
  });

  app.post('/appointment', (req, res) => {
    console.log(req);
    // conn.getRepository(Appointment).create()
    return "POST"
  });

  app.put('/appointment', (req, res) => {
    return res.send('PUT HTTP method on user resource');
  });

  app.delete('/appointment', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
  });

  app.listen(4001, () => { console.log('appointmentService\nlocalhost:4001'); })

};

main().catch( err => console.log(err));
