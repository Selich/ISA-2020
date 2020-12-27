import { Field, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { PatientDetails } from "./PatientDetails";

@ObjectType()
@Entity()
export class Tier extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column()
  discount: number;

  @Field()
  @Column()
  score: number;

  @Field(() => [PatientDetails])
  @OneToMany(() => PatientDetails, item => item.tier)
  patients: PatientDetails[];

}
