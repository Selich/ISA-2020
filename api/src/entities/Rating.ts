import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";
import Patient from './Patient';
import { Pharmacy } from "./Pharmacy";

@ObjectType()
@Entity()
export class Rating extends Model{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Patient, { nullable: true, eager: true })
  patient: Patient;

  @ManyToOne(() => Employee, {nullable: true})
  employee: Employee;

  @ManyToOne(() => Pharmacy, {nullable: true})
  pharmacy: Pharmacy;

  @Field()
  @Column()
  complain: string;
}
