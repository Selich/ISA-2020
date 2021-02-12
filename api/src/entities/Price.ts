import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
  medicineItem: MedicineItem;

  @Field()
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  from: string;

}
