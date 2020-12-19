import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import { CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class MedicineRequest extends MedicineList{

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @ManyToOne(() => User)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

}

