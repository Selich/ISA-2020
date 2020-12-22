import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, ID, ObjectType } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import { CreateDateColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Medicine } from "./Medicine";

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

