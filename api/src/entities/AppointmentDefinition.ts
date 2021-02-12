import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";
import { Pharmacy } from "./Pharmacy";


@ObjectType()
@Entity()
export class AppointmentDefinition extends Model{

  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: true })
  kind: string;

  @Field()
  @Column({ nullable: true })
  score: number;
<<<<<<< HEAD
=======

  @Field()
  @Column({ nullable: true })
  price: number;
>>>>>>> dev

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.requests,  { cascade: true, nullable: true})
  @JoinTable()
  pharmacy: Pharmacy;

}
