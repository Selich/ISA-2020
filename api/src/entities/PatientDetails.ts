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
import { Model } from "./Model";


@ObjectType()
@Entity()
export class PatientDetails extends Model{
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Appointment, item => item.patient)
  appointments: Appointment[];

  @Field(() => [Medicine])
  @ManyToMany(() => Medicine, item => item.patientsAllergic)
  allergies: Medicine[];

  @Field(() => [Prescrition])
  @OneToMany(() => Prescrition, item => item.patient)
  prescritions: Prescrition[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.patient)
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.patient)
  ratings: Rating[];

  @OneToMany(() => Complaint, item => item.patient)
  complaints: Complaint[];

  @OneToOne(() => User)
  user: User;

  @Field(() => Tier)
  @ManyToOne(() => Tier)
  tier: Tier;

  @Field()
  @Column({nullable: true})
  score: number;

  @Field()
  @Column({nullable: true})
  penalty: number;

}
