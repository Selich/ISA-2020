import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, Column } from "typeorm";
import { Appointment } from "./Appointment";
import { Complaint } from "./Complaint";
import { Medicine } from "./Medicine";
import { Pharmacy } from "./Pharmacy";
import { Prescription } from "./Prescription";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";
import { Tier } from "./Tier";
import User from "./User";


@ObjectType()
@Entity()
export default class Patient extends User{

  @Field(() => [Appointment])
	@OneToMany(() => Appointment, item => item.patient, {eager:true, cascade: true})
  appointments: Appointment[];

	@Field(() => [Medicine], {nullable: true})
  @ManyToMany(() => Medicine, item => item.patientsAllergic)
  allergies: Medicine[];

  @Field(() => [Prescription])
  @OneToMany(() => Prescription, item => item.patient)
  prescritions: Prescription[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.patient)
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.patient)
  ratings: Rating[];

  @Field(() => [Pharmacy])
  @ManyToMany(() => Pharmacy, item => item.subscribers)
  subscriptions: Pharmacy[];

  @OneToMany(() => Complaint, item => item.patient)
  complaints: Complaint[];

	@Field(() => Tier, {nullable: true})
	@ManyToOne(() => Tier, {eager:true, nullable:true})
  tier: Tier;

  @Field()
  @Column({nullable: true})
  score: number;

  @Field()
  @Column({nullable: true})
  penalty: number;

	@Field(() => Boolean)
  @Column({ default: false })
  isEnabled: boolean;

}

