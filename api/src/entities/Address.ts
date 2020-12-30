import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, Column } from "typeorm";
import { Model } from "./Model";
import { ObjectType, Field, InputType } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import User from "./User";

@ObjectType()
@Entity()
export class Address extends Model{

  @OneToMany(() => User, user => user.address )
  users: User[]

  // @Field(() => Pharmacy)
  @OneToOne(() => Pharmacy)
  pharmacy: Pharmacy

  @Field()
  @Column({ nullable: true })
  street: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  country: string;


}
