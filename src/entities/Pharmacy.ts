import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { MedicineRequest } from "./MedicineRequest";
import { PatientDetails } from "./PatientDetails";
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

  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @OneToOne(() => Address)
  address: Address;

  @Field()
  @Column()
  long: number;

  @Field()
  @Column()
  lat: number;

  @ManyToMany(() => User, item => item.pharmacies)
  employees: User[];

  @OneToMany(() => MedicineRequest, item => item.pharmacy)
  requests: MedicineRequest[];

  @OneToMany(() => Reservation, item => item.patient)
  prescritions: Reservation[];

  @OneToMany(() => Appointment, item => item.pharmacy)
  appointments: Appointment[];

  @ManyToMany(() => PatientDetails)
  subscribers: PatientDetails[];

  @OneToMany(() => Rating, item => item.pharmacy)
  ratings: Rating[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}

