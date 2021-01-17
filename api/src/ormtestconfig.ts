import path from "path";
import { ConnectionOptions } from "typeorm";
import { Address } from "./entities/Address";
import { Appointment } from "./entities/Appointment";
import { Employee } from "./entities/Employee";
import Patient from "./entities/Patient";
import { Pharmacy } from "./entities/Pharmacy";



export default
    {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'super_isa',
    password: process.env.DATABASE_PASSWORD,
    // url: 'postgres://super_user:pass@localhost:5432/isa_test',
    synchronize: true,
    dropSchema: true,
    logging: false,
    synchroize: true,
    migrationsRun: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ Employee, Pharmacy, Address, Patient, Appointment]
    // entities: [Patient, Appointment, Medicine, ,Address]
  } as ConnectionOptions;
