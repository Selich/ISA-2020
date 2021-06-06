import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Model } from "./Model";
import Patient from "./Patient";

@ObjectType()
@Entity()
export class Tier extends Model{

  @Field()
  @Column({nullable: true})
  name: string;

  @Field()
  @Column({nullable: true})
  discount: number;

  @Field()
  @Column({nullable: true})
  scoreMin: number;

  @Field()
  @Column({nullable: true})
  scoreMax: number;

  @Field(() => [Patient])
  @OneToMany(() => Patient, item => item.tier, {nullable:true})
  patients: Patient[];

}
