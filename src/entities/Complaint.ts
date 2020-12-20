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
  author!: PatientDetails;

  //Nije Null ako je neki admin sistema odgovorio
  @Column()
  answer: string; 

  @Column()
  description: string;

  @ManyToOne(()=>User)
  doctor: User;

  @ManyToOne(()=>Pharmacy)
  pharmacy: Pharmacy;

}
