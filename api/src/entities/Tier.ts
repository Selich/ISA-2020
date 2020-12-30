import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Model } from "./Model";
import Patient from "./Patient";

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

  @Field(() => [Patient])
  @OneToMany(() => Patient, item => item.tier)
  patients: Patient[];

}
