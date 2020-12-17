import { PrimaryKey, Property } from "@mikro-orm/core";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";

export class Rating {

  @PrimaryKey()
  id!: number;

  @Property()
  patient: PatientDetails;

  @Property()
  doctor: number;

  @Property()
  pharmacy: Pharmacy;

  @Property()
  complain: string;

  @Property()
  score: number;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();


}
