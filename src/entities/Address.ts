import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Address {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ nullable: true, default:'' })
  street: string;

  @Field()
  @Property({ nullable: true, default:'' })
  city: string;

  @Field()
  @Property({ nullable: true, default:'' })
  country: string;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();


}
