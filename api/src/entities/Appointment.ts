import { ObjectType, Field, ID, Float, InputType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";
import Patient from "./Patient";
import { Pharmacy } from "./Pharmacy";
import { Prescription } from "./Prescription";

@ObjectType()
@Entity()
export class Appointment extends Model{

  @Field(() => Patient)
  @ManyToOne(() => Patient, item => item.appointments,  { eager: true, cascade: true })
  @JoinTable()
  patient: Patient;

  @Field(() => Employee)
  @ManyToOne(() => Employee, item => item.schedule,  { eager: true, cascade: true })
  @JoinTable()
  employee: Employee;

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.appointments,  {  cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => Prescription)
  @OneToOne(() => Prescription, item => item.appointment ,{  cascade: true, nullable:true})
  @JoinColumn()
  prescription: Prescription;

  @Field()
  @Column({ nullable: true})
  type: string;

  @Field()
  @Column({ nullable: true})
  score: number;

  @Field()
  @Column({ nullable: true})
  price: number;

  @Field()
  @Column({ nullable: true})
  discount: number;

  @Field()
  @Column({ nullable: true})
  report: string;

  @Field()
  @Column({ nullable: true})
  isVisited: boolean;

  @Field(() => String)
  @Column({ type: Date })
  from: Date;

  @Field(() => String)
  @Column({ type: Date })
  until: Date;

}
