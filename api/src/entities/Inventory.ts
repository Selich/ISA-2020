import { Field, InputType, ObjectType } from "type-graphql";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
import { ChildEntity, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm'
import { Employee } from "./Employee";
import { MedicineList } from "./MedicineList";
import { Pharmacy } from "./Pharmacy";

@ObjectType()
@ChildEntity()
export class Inventory extends MedicineList{

  @Field(() => Employee)
  @OneToOne(() => Employee)
  supplier: Employee;

  @Field(() => Pharmacy)
  @OneToOne(() => Pharmacy)
  pharmacy: Pharmacy;

}
