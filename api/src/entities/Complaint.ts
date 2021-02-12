import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";
import Patient from "./Patient";
import { Pharmacy } from "./Pharmacy";
import { Employee } from "./Employee";

@ObjectType()
@Entity()
export class Complaint extends Model{

	@Field(() => Patient, {nullable:true})
	@ManyToOne(() => Patient, item => item.complaints,  { eager: true, cascade: true, nullable: true })
  @JoinTable()
  patient: Patient;

	@Field(() => Employee, {nullable:true})
	@ManyToOne(() => Employee, item => item.complaints,  { eager: true, cascade: true, nullable:true })
  @JoinTable()
  employee: Employee;

	@Field(() => Pharmacy, {nullable:true})
	@ManyToOne(() => Pharmacy, item => item.complaints,  { eager: true, cascade: true, nullable:true })
  @JoinTable()
  pharmacy: Pharmacy;

	@Field({ nullable: true })
	@Column({ nullable: true })
  description: string;

}
