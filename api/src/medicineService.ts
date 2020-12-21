import express from 'express';
import cors from 'cors';
import 'reflect-metadata'

import { __prod__ } from "./constants";
import { createConnection } from 'typeorm';
import dbConfig from './typeorm.config'
import { Medicine } from './entities/Medicine';

const main = async () => {
  const conn = await createConnection(dbConfig);

  const app = express()
  app.use( cors({ origin: "http://localhost:4000", credentials: true }))
  // app.get('/medicine', (req, res) => {
  //   conn.getRepository(Medicine)
  //   .createQueryBuilder('medicine')
  //   .leftJoinAndSelect("medicine.list", "inventory")
  //   .where("inventory.pharmacy = :pharmacy", { pharmacy: req.pharmacyID })
  // });

  // app.post('/reserveMedicine', async (req, res) => {
  //   const medicine: Medicine|undefined = await conn.getRepository(Medicine)
  //   .createQueryBuilder('medicine')
  //   .leftJoinAndSelect("medicine.list", "inventory")
  //   .where("inventory.pharmacy = :pharmacy", { pharmacy: req.pharmacyID })
  //   .andWhere("medicine.id = :id", {id: req.id })
  //   .getOne()

  //   const tempMedicine = medicine
  //   tempMedicine?.quantity -= req.quantity

  //   await conn.getRepository(Medicine).save(tempMedicine)
  //   return "POST"
  // });

  app.post('/medicine', (req, res) => {
    console.log(req);
    // conn.getRepository(Appointment).create()
    return "POST"
  });

  app.put('/medicine', (req, res) => {
    return res.send('PUT HTTP method on user resource');
  });

  app.delete('/medicine', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
  });

  app.listen(4002, () => { console.log('medicineService\nlocalhost:4002'); })

};

main().catch( err => console.log(err));
