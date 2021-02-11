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
  @ManyToOne(() => Patient, item => item.appointments)
  @JoinTable()
  patient: Patient;

	@Field(() => Employee, {nullable: true})
  @ManyToOne(() => Employee, item => item.schedule,  { eager: true, cascade: true })
  @JoinTable()
  employee: Employee;

	@Field(() => Pharmacy, {nullable: true})
	@ManyToOne(() => Pharmacy, item => item.appointments  )
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => Prescription, {nullable: true})
  @OneToOne(() => Prescription, item => item.appointment ,{  cascade: true, nullable:true})
  @JoinColumn()
  prescription: Prescription;

  @Field()
  @Column({ nullable: true})
  kind: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  score: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  price: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  discount: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  report: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  isVisited: boolean;

	@Field(() => String, {nullable: true})
	@Column({nullable: true })
  begin: string;

	@Field(() => Number, {nullable: true})
	@Column({nullable: true })
  length: number;

}
