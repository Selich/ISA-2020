import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@ObjectType()
@Entity()
export class Complaint{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => PatientDetails)
  @ManyToOne(() => PatientDetails, item => item.complaints,  { eager: true, cascade: true })
  @JoinTable()
  patient: PatientDetails;

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.reservations,  { eager: true, cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field()
  @Column()
  description: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
