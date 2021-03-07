import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, Column } from "typeorm";
import { Model } from "./Model";
import { ObjectType, Field, InputType } from "type-graphql";
import { Pharmacy } from "./Pharmacy";
import User from "./User";

@ObjectType()
@Entity()
export class Address extends Model{

  @OneToMany(() => User, user => user.address, {nullable:true} )
  users: User[]

  // @Field(() => Pharmacy)
  @OneToOne(() => Pharmacy, {nullable: true})
  pharmacy: Pharmacy

	@Field({nullable: true})
  @Column({ nullable: true })
  street: string;

	@Field({nullable: true})
  @Column({ nullable: true })
  city: string;

	@Field({nullable: true})
  @Column({ nullable: true })
  country: string;


}
