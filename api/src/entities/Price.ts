import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medicine } from "./Medicine";
import { Model } from "./Model";
import { Pharmacy } from "./Pharmacy";

@ObjectType()
@Entity()
export class Price extends Model{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.prices,  {  cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine, item => item.prices,  { eager: true, cascade: true })
  @JoinTable()
  medicine: Medicine;

  @Field()
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  from: Date;

}