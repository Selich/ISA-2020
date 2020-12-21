import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { MedicineRequest } from "./MedicineRequest";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";

@Entity()
export class Pharmacy extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Address)
  address: Address;

  @Field()
  @Column()
  long: number;

  @Field()
  @Column()
  lat: number;

  @OneToMany(() => MedicineRequest, item => item.pharmacy)
  requests: MedicineRequest[];

  @OneToMany(() => Reservation, item => item.patient)
  prescritions: Reservation[];

  @OneToMany(() => Appointment, item => item.pharmacy)
  appointments: Appointment[];

  @OneToMany(() => Rating, item => item.pharmacy)
  ratings: Rating[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}

