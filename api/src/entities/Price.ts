import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medicine } from "./Medicine";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@ObjectType()
@Entity()
export class Price extends BaseEntity{

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

  @Field(() => String)
  @Column()
  until: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
