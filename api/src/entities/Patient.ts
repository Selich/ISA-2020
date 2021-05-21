import { ObjectType, Field, InputType } from "type-graphql";
import {
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
	ChildEntity,
  ManyToOne,
  Column,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Complaint } from "./Complaint";
import { Medicine } from "./Medicine";
import { Pharmacy } from "./Pharmacy";
import { EPrescription } from "./EPrescription";
import { Prescription } from "./Prescription";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";
import { Tier } from "./Tier";
import User from "./User";

@ObjectType()
@ChildEntity()
export default class Patient extends User {
  @Field(() => [Appointment], { nullable: true })
  @OneToMany(() => Appointment, (item) => item.patient, {nullable: true})
  appointments: Appointment[];

  @Field(() => [Medicine], { nullable: true })
  @ManyToMany(() => Medicine, (item) => item.patientsAllergic,  {nullable: true})
  allergies: Medicine[];

  @Field(() => [Prescription])
  @OneToMany(() => Prescription, (item) => item.patient,  {nullable: true})
  prescritions: Prescription[];

  @Field(() => [EPrescription])
  @OneToMany(() => EPrescription, (item) => item.patient,  {nullable: true})
  ePrescriptions: EPrescription[];

  @Field(() => [Reservation])
	@OneToMany(() => Reservation, (item) => item.patient, {eager: false, cascade:true,  nullable: true})
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, (item) => item.patient, {nullable:true})
  ratings: Rating[];

  @Field(() => [Pharmacy], { nullable: true })
  @ManyToMany(() => Pharmacy, (item) => item.subscribers, { eager: true, nullable:true })
  @JoinTable()
  subscriptions: Pharmacy[];

  @OneToMany(() => Complaint, (item) => item.patient, {nullable:true})
  complaints: Complaint[];

  @Field(() => Tier, { nullable: true })
  @ManyToOne(() => Tier, { eager: true, nullable: true })
  tier: Tier;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  score: number;

  @Field({ nullable: true })
  @Column({ nullable: true, default:0 })
  penalty: number;

}
