import { __prod__ } from "./constants";
import { ConnectionOptions } from "typeorm";
import path from "path";
import { PatientDetails } from "./entities/PatientDetails";
import { Appointment } from "./entities/Appointment";
import { Address } from "./entities/Address";
import { Complaint } from "./entities/Complaint";
import { Inventory } from "./entities/Inventory";
import { Medicine } from "./entities/Medicine";
import { MedicineDetails } from "./entities/MedicineDetails";
import { Pharmacy } from "./entities/Pharmacy";
import { Prescrition } from "./entities/Prescription";
import { Reservation } from "./entities/Reservation";
import { Subscription } from "type-graphql";
import { WorkingHours } from "./entities/WorkingHours";
import { MedicineList } from "./entities/MedicineList";
import { Order } from "./entities/Order";
import { Rating } from "./entities/Rating";
import { Report } from "./entities/Report";
import { Tier } from "./entities/Tier";
import { User } from "./entities/User";
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
      Address,
      Appointment,
      Complaint,
      Inventory,
      Medicine,
      MedicineDetails,
      MedicineList,
      Order,
      PatientDetails,
      Pharmacy,
      Prescrition,
      Rating,
      Report,
      Reservation,
      Subscription,
      Tier,
      User,
      WorkingHours
    ]} as ConnectionOptions;
