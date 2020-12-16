import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Pharmacy } from "./Pharmacy";
import { Report } from "./Report";
import { User } from "./User";


// TODO: HOLIDAYS
@Entity()
export class Appointment {

  @PrimaryKey()
  id!: number;

  // consulting, examination
  // pharmacist, dherm
  @PrimaryKey()
  type!: string;

  // @Property()
  // patient: User;

  // @Property()
  // doctor: User;

  @Property()
  pharmacy: Pharmacy;

  @Property()
  price: number;

  @Property()
  report: Report;

  @Property({ type: Date })
  from: Date;

  @Property({ type: Date })
  until: Date;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();

}
