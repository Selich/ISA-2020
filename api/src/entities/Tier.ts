import { Field, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Model } from "./Model";
import { PatientDetails } from "./PatientDetails";

@ObjectType()
@Entity()
export class Tier extends Model{

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
  scoreMin: number;

  @Field()
  @Column()
  scoreMax: number;

  @Field(() => [PatientDetails])
  @OneToMany(() => PatientDetails, item => item.tier)
  patients: PatientDetails[];

}
