import { Float, Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";
import Patient from './Patient';
import { Pharmacy } from "./Pharmacy";
import { Medicine } from "./Medicine";

@ObjectType()
@Entity()
export class Rating extends Model{

  @ManyToOne(() => Patient, { nullable: true})
  patient: Patient;

  @ManyToOne(() => Employee, {nullable: true})
  employee: Employee;

  @ManyToOne(() => Pharmacy, {nullable: true})
  pharmacy: Pharmacy;

  @ManyToOne(() => Medicine, {nullable: true})
  medicine: Medicine;

	@Field(() => Float, {nullable:true})
	@Column()
  rating: number;
}
