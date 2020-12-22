import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Prescrition } from "./Prescription";
import { User } from "./User";

@ObjectType()
@Entity()
export class Appointment extends BaseEntity{

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

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field(() => Prescrition)
  @OneToOne(() => Prescrition, item => item.appointment ,{ eager: true, cascade: true, nullable:true})
  @JoinColumn()
  prescription: Prescrition;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  score: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  report: string;

  @Column()
  isVisited: boolean;

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
