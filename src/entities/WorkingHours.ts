import { Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@Entity()
export class WorkingHours {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(()=>User,item=>item.workingHours)
  doctor: User;

  @ManyToMany(()=>Pharmacy,item=>item.workingHours)
  pharmacy: Pharmacy;

  @Field()
  @Column()
  from: Date;

  @Field()
  @Column()
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();


}
