import {  ObjectType, Field, InputType } from "type-graphql";
import { JoinTable, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, Column } from "typeorm";
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
@Entity()
export default class Patient extends User{

  @Field(() => [Appointment], {nullable: true})
	@OneToMany(() => Appointment, item => item.patient)
  appointments: Appointment[];

	@Field(() => [Medicine], {nullable: true})
  @ManyToMany(() => Medicine, item => item.patientsAllergic)
  allergies: Medicine[];

  @Field(() => [Prescription])
  @OneToMany(() => Prescription, item => item.patient)
  prescritions: Prescription[];

  @Field(() => [EPrescription])
  @OneToMany(() => EPrescription, item => item.patient)
  ePrescriptions: EPrescription[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.patient)
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.patient)
  ratings: Rating[];

	//TODO: Needs to get it
	@Field(() => [Pharmacy], {nullable: true})
	@ManyToMany(() => Pharmacy, item => item.subscribers,{eager:true})
	@JoinTable()
  subscriptions: Pharmacy[];

  @OneToMany(() => Complaint, item => item.patient)
  complaints: Complaint[];

	@Field(() => Tier, {nullable: true})
	@ManyToOne(() => Tier, {eager:true, nullable:true})
  tier: Tier;

	@Field({nullable: true})
  @Column({nullable: true})
  score: number;

	@Field({nullable: true})
  @Column({nullable: true})
  penalty: number;

	@Field(() => Boolean)
  @Column({ default: false })
  isEnabled: boolean;

}

