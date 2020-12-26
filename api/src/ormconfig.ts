import { __prod__ } from "./constants";
import { ConnectionOptions } from "typeorm";
import path from "path";
import { Address } from "./entities/Address";
import { Appointment } from "./entities/Appointment";
import { AppointmentDefinition } from "./entities/AppointmentDefinition";
import { Complaint } from "./entities/Complaint";
import { Holiday } from "./entities/Holiday";
import { Inventory } from "./entities/Inventory";
import { Medicine } from "./entities/Medicine";
import { MedicineItem } from "./entities/MedicineItem";
import { MedicineList } from "./entities/MedicineList";
import { MedicineRequest } from "./entities/MedicineRequest";
import { Order } from "./entities/Order";
import { PatientDetails } from "./entities/PatientDetails";
import { Pharmacy } from "./entities/Pharmacy";
import { Prescrition } from "./entities/Prescription";
import { Price } from "./entities/Price";
import { Rating } from "./entities/Rating";
import { Reservation } from "./entities/Reservation";
import { Tier } from "./entities/Tier";
import { User } from "./entities/User";
import { WorkingHours } from "./entities/WorkingHours";

export default
    {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    logging: true,
    username: 'super_isa',
    password: 'pass',
    database: 'isa',
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
  entities: [
        User,Medicine,Pharmacy,Price,Rating,Reservation,
        Inventory, MedicineList, MedicineItem, WorkingHours,
        Prescrition, PatientDetails, Order, MedicineRequest, Holiday,
        Complaint, Appointment, AppointmentDefinition, Address, Tier,
        Holiday
    ]} as ConnectionOptions;

// export default
//     {
//     type: process.env.DATABASE_TYPE,
//     host: 'localhost',
//     port: 5432,
//     logging: true,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DATABASE,
//     synchronize: !!process.env.ORM_SYNC,
//   } as ConnectionOptions;
