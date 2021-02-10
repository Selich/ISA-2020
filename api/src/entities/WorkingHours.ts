import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";
import { Pharmacy } from "./Pharmacy";

@ObjectType()
@Entity()
export class WorkingHours extends Model{

  @Field(() =>  Employee)
  @ManyToOne(() => Employee, item => item.workingHours)
  @JoinTable()
  employee:  Employee;

  @Field()
  @ManyToOne(() => Employee, item => item.workingHours)
  @JoinTable()
  pharmacy: Pharmacy;

  @Field()
  @Column()
  from: string;

  @Field()
  @Column()
  until: string;

}
