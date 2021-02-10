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

	@Field({nullable: true})
  @Column({ nullable: true})
  long: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  lat: string;

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

