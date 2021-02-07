import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { AppointmentDefinition } from "./AppointmentDefinition";
import { Complaint } from "./Complaint";
import { Inventory } from "./Inventory";
import { MedicineRequest } from "./MedicineRequest";
import { Model } from "./Model";
import  Patient  from "./Patient";
import { Price } from "./Price";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Pharmacy extends Model {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Address)
  @OneToOne(() => Address, item => item.pharmacy, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  address: Address;

  @Field()
  @Column({ nullable: true})
  name: string;

  @Field()
  @Column({ nullable: true})
  long: string;

  @Field()
  @Column({ nullable: true})
  lat: string;

  @Field(() => Inventory)
  @OneToOne(() => Inventory, item => item.pharmacy, { eager: true, cascade: true, nullable: true})
  @JoinColumn()
  inventory: Inventory;

  @Field(() => [Price])
  @OneToMany(() => Price, item => item.pharmacy, { eager: true, nullable: true})
  prices: Price[];

  @Field(() => [AppointmentDefinition])
  @OneToMany(() => AppointmentDefinition, item => item.pharmacy, {nullable: true})
  definitions: AppointmentDefinition[];

  @Field(() => [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.pharmacy, { eager: true , nullable: true})
  requests: MedicineRequest[];

  @OneToMany(() => Reservation, item => item.patient, {nullable: true})
  prescritions: Reservation[];

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

}

