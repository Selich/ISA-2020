import { Complaint } from "./Complaint";
import {  Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, OneToOne } from 'typeorm'
import {  Field, ID, ObjectType} from 'type-graphql';
import { Prescrition } from "./Prescription";
import { Reservation } from "./Reservation";
import { MedicineDetails } from "./MedicineDetails";
import { Tier } from "./Tier";
import { Appointment } from "./Appointment";
import { Rating } from "./Rating";
import { User } from "./User";
import { Subscription } from "./Subscription";


@ObjectType()
@Entity()
export class PatientDetails{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Appointment, item => item.patient)
  appointments: Appointment[];

  @ManyToMany(() => MedicineDetails, item => item.patientsAllergic)
  allergies: MedicineDetails[];

  @OneToMany(() => Prescrition, item => item.patient)
  prescritions: Prescrition[];

  @OneToMany(() => Reservation, item => item.patient)
  reservations: Reservation[];

  @OneToMany(() => Rating, item => item.patient)
  ratings: Rating[];

  @OneToMany(() => Complaint, item => item.patient)
  complaints: Complaint[];

  @OneToMany(() => Subscription, item => item.user)
  subscribers: Subscription;

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
