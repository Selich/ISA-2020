import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {  Medicine } from "./Medicine";
import { MedicineItem } from "./MedicineItem";
import { Model } from "./Model";
import { Pharmacy } from "./Pharmacy";

@ObjectType()
@Entity()
export class Price extends Model{


  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.prices,  {  cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => MedicineItem)
  @ManyToOne(() => MedicineItem, item => item.prices )
  @JoinTable()
  medicine: MedicineItem;

  @Field()
  @Column( {nullable:true})
  price: number;

  @Field(() => String)
  @Column( {nullable:true})
  from: string;

}
