import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field } from "type-graphql";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Column, ManyToOne } from "typeorm";

@Entity()
export class Reservation extends MedicineList{

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @ManyToOne(() => PatientDetails)
  patient!: PatientDetails;

  @Field()
  @Column()
  deadline: Date;

  @Field({ nullable: true})
  @Column({ default: null, nullable: true })
  pickupDate: Date;


}
