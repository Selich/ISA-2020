import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { AppointmentDefinition } from "./AppointmentDefinition";
import { Complaint } from "./Complaint";
import { EPrescription } from "./EPrescription";
import { WorkingHours } from "./WorkingHours";
import { Inventory } from "./Inventory";
import { Employee } from "./Employee";
import { MedicineRequest } from "./MedicineRequest";
import { Model } from "./Model";
import  Patient  from "./Patient";
import { Price } from "./Price";
import { Rating } from "./Rating";
import { Prescription } from "./Prescription";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Pharmacy extends Model {


	@Field(() => Address, {nullable:true})
  @OneToOne(() => Address, item => item.pharmacy, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  address: Address;

	@Field({ nullable: true })
  @Column({ nullable: true})
  name: string;

  @Field(() => Inventory)
  @OneToOne(() => Inventory, item => item.pharmacy, { eager: true, cascade: true, nullable: true})
  @JoinColumn()
  inventory: Inventory;

  @Field(() => [Price])
  @OneToMany(() => Price, item => item.pharmacy, { eager: true, nullable: true})
  prices: Price[];

  @Field(() => [Employee])
  @OneToMany(() => Employee, item => item.pharmacy, {nullable: true})
  admins: Employee[];

  @Field(() => [AppointmentDefinition])
  @OneToMany(() => AppointmentDefinition, item => item.pharmacy, {nullable: true})
  definitions: AppointmentDefinition[];

  @Field(() => [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.pharmacy, {  nullable: true})
  requests: MedicineRequest[];

  @OneToMany(() => Prescription, item => item.patient, {nullable: true})
  prescritions: Prescription[];

  @OneToMany(() => EPrescription, item => item.patient, {nullable: true})
  ePrescriptions: EPrescription[];

  @OneToMany(() => WorkingHours, item => item.pharmacy, {nullable: true})
  workingHours: WorkingHours[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, item => item.pharmacy,{nullable: true})
  appointments: Appointment[];

  @Field(() => [Patient])
  @ManyToMany(() => Patient, item => item.subscriptions,{nullable: true})
  subscribers: Patient[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.pharmacy,{nullable: true})
  reservations: Reservation[];

  @Field(() => [Complaint])
  @OneToMany(() => Complaint, item => item.pharmacy,{nullable: true})
  complaints: Complaint[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.pharmacy,{nullable: true})
  ratings: Rating[];

	@Field({nullable: true})
  @Column({nullable: true})
  averageRating: number;

}

