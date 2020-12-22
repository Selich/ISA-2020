import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { MedicineRequest } from "./MedicineRequest";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class Pharmacy extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Address)
  @OneToOne(() => Address, item => item.pharmacy,{ eager: true, cascade: true, nullable:true})
  @JoinColumn()
  address: Address;

  @Field()
  @Column()
  long: number;

  @Field()
  @Column()
  lat: number;

  @Field(() => [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.pharmacy, { eager: true})
  requests: MedicineRequest[];

  @OneToMany(() => Reservation, item => item.patient)
  prescritions: Reservation[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, item => item.pharmacy, {eager: true})
  appointments: Appointment[];

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, item => item.pharmacy)
  reservations: Reservation[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.pharmacy)
  ratings: Rating[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
