import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class WorkingHours extends Model{

  @Field(() =>  Employee)
  @ManyToOne(() => Employee, item => item.workingHours)
  @JoinTable()
  employee:  Employee;

  @Field()
  @Column()
  pharmacyID: number;

  @Field()
  @Column()
  from: string;

  @Field()
  @Column()
  until: string;

}
