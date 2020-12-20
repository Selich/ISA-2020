import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { MedicineRequest } from "./MedicineRequest";
import { PatientDetails } from "./PatientDetails";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";
import { WorkingHours } from "./WorkingHours";


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

  //Svi Farm,Derm,Admini apoteke
  @ManyToMany(()=>WorkingHours)
  workingHours:WorkingHours[];

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

