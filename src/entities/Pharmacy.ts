import { printSchema } from "graphql";
import { Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { Complaint } from "./Complaint";
import { Inventory } from "./Inventory";
import { MedicineRequest } from "./MedicineRequest";
import { Order } from "./Order";
import { PatientDetails } from "./PatientDetails";
import { Price } from "./Price";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";
import { Subscription } from "./Subscription";
import { User } from "./User";
// Na stranici profila apoteke potrebno je prikazati sledeće informacije:
// ● listu dermatologa i farmaceuta koji su zaposleni u njoj,
// ● listu lekova koje apoteka ima na stanju,
// ● listu svih termina za preglede kod dermatologa koje može da zakaže,
// ● prosečnu ocenu apoteke.
// Sa stranice profila apoteke potrebno je registrovanom korisniku omogućiti da:
// ● rezerviše lek,
// ● proveri dostupnost leka preko eRecepta,
// ● zakaže savetovanje kod farmaceuta,
// ● zakaže pregled kod dermatologa,
// ● se pretplati na akcije i promocije koje definiše administrator apoteke.


@Entity()
export class Pharmacy extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @OneToOne(() => Address)
  address: Address;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  long: number;

  @Field()
  @Column()
  lat: number;

  @OneToOne(() => Inventory)
  inventory: Inventory;

  //Svi Farm,Derm,Admini apoteke
  @ManyToMany(()=>WorkingHours)
  workingHours:WorkingHours[];

  @OneToMany(()=>Price,item=>item.pharmacy)
  prices:Price[];

  @OneToMany(()=>Complaint,item=>item.pharmacy)
  complaints: Complaint[];

  @OneToMany(() => MedicineRequest, item => item.pharmacy)
  requests: MedicineRequest[];

  @OneToMany(() => Reservation, item => item.pharmacy)
  reservations: Reservation[];

  @OneToMany(() => Appointment, item => item.pharmacy)
  appointments: Appointment[];

  @OneToMany(() => Order, item => item.pharmacy)
  orders: Order[];

  @OneToMany(() => Rating, item => item.pharmacy)
  ratings: Rating[];

  @ManyToMany(() => PatientDetails)
  subscribers: PatientDetails[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}

