import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field } from "type-graphql";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { ManyToOne } from "typeorm";

@Entity()
export class Reservation extends MedicineList{

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @ManyToOne(() => PatientDetails)
  patient!: PatientDetails;

  @Field()
  deadline: Date;

  @Field()
  isDelivered: boolean;

}
