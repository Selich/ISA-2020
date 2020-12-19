import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Report } from "./Report";
import { User } from "./User";


// TODO: HOLIDAYS
@Entity()
export class Appointment {

  @PrimaryGeneratedColumn()
  id!: number;

  // // consulting, examination
  // // pharmacist, dherm
  // @PrimaryKey()
  // type!: string;

  // // @Property()
  // // patient: User;

  @ManyToOne(() => User)
  doctor: User;

  @ManyToOne(() => PatientDetails)
  patient: User;

  // @Property()
  // pharmacy: Pharmacy;

  // @Property()
  // price: number;

  // @Property()
  // report: Report;

  // @Property({ type: Date })
  // from: Date;

  // @Property({ type: Date })
  // until: Date;

  // @Property()
  // createdAt = new Date();

  // @Property()
  // updatedAt = new Date();

}
