import { ObjectType, Field, ID, Float } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Prescrition } from "./Prescription";
import { User } from "./User";

@ObjectType()
@Entity()
export class Appointment extends Model{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => PatientDetails)
  @ManyToOne(() => PatientDetails, item => item.appointments,  { eager: true, cascade: true })
  @JoinTable()
  patient: PatientDetails;

  @Field(() => User)
  @ManyToOne(() => User, item => item.schedule,  { eager: true, cascade: true })
  @JoinTable()
  doctor: User;

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.appointments,  {  cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => Prescrition)
  @OneToOne(() => Prescrition, item => item.appointment ,{  cascade: true, nullable:true})
  @JoinColumn()
  prescription: Prescrition;

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
