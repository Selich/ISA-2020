import { Field } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@Entity()
export class Complaint{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  patient!: PatientDetails;

  @Column()
  description: string;

  // @Field()
  // doctor: User;

  // @Entity()
  // pharmacy: Pharmacy;

}
