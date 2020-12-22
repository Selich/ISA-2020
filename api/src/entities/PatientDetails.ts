import { Complaint } from "./Complaint";
import {  Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, OneToOne, BaseEntity, JoinColumn } from 'typeorm'
import {  Field, ID, ObjectType} from 'type-graphql';
import { Prescrition } from "./Prescription";
import { Reservation } from "./Reservation";
import { Medicine } from "./Medicine";
import { Tier } from "./Tier";
import { Appointment } from "./Appointment";
import { Rating } from "./Rating";
import { User } from "./User";


@ObjectType()
@Entity()
export class PatientDetails extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Appointment, item => item.patient)
  appointments: Appointment[];

  @Field(() => [Medicine])
  @ManyToMany(() => Medicine, item => item.patientsAllergic)
  allergies: Medicine[];

  @Field(() => [Prescrition])
  @OneToMany(() => Prescrition, item => item.patient, {eager:true})
  prescritions: Prescrition[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.patient, {eager:true})
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.patient, {eager: true})
  ratings: Rating[];

  @OneToMany(() => Complaint, item => item.patient)
  complaints: Complaint[];

  @OneToOne(() => User)
  user: User;

  @ManyToOne(() => Tier)
  tier: Tier;

  @Field()
  @Column()
  score: number;

  @Field()
  @Column()
  penalty: number;

}
