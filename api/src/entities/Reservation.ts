import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, ObjectType } from "type-graphql";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Column, JoinTable, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Reservation extends MedicineList{

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.reservations,  { eager: true, cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @ManyToOne(() => PatientDetails, item => item.reservations,  {  cascade: true })
  @JoinTable()
  patient!: PatientDetails;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  pickupDate: Date;


}
