import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, ObjectType } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import { CreateDateColumn, JoinTable, ManyToOne, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class MedicineRequest extends MedicineList{

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.requests,  { cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => User)
  @ManyToOne(() => User, item => item.requests,  { eager: true, cascade: true })
  @JoinTable()
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

}

