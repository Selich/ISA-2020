import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Pharmacy } from "./Pharmacy";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class WorkingHours extends Model{

  @Field(() =>  Employee)
  @ManyToOne(() => Employee, item => item.workingHours)
  @JoinTable()
  employee:  Employee;

  @Field(() =>  Pharmacy)
	@ManyToOne(() => Pharmacy, item => item.workingHours, {eager:false})
  @JoinTable()
  pharmacy:  Pharmacy;

	@Field({nullable: true})
	@Column({nullable: true})
  from: string;

	@Field({nullable: true})
	@Column({nullable:true})
  until: string;

}
