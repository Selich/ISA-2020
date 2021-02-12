import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import { CreateDateColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medicine } from "./Medicine";
import { Employee } from "./Employee";

@ObjectType()
@Entity()
export class MedicineRequest{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine, item => item.requests,  { cascade: true })
  @JoinTable()
  medicine: Medicine;

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.requests,  { cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => Employee)
  @ManyToOne(() => Employee, item => item.requests,  { eager: true, cascade: true })
  @JoinTable()
  employee: Employee;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

}

