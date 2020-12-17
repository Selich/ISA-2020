import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Address } from "./Address";
import { Role } from "./Role";
import { Int, ObjectType, Field } from 'type-graphql';


@ObjectType()
@Entity()
export class User {

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  email!: string;

  @Field(() => String)
  @Property()
  password!: string;

  @Field(() => String)
  @Property({ nullable: true })
  role!: string;

  @Field(() => String)
  @Property({ nullable: true })
  firstName: string;

  @Field(() => String)
  @Property({ nullable: true })
  lastName: string;

  @Field(() => String)
  @Property({ nullable: true })
  gender: string;

  @Field()
  @Property({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Field()
  @Property({ nullable: true })
  address: Address;

  @Field()
  @Property({ nullable: true })
  telephone: string;

  // @Property()
  // details: PatientDetails;

  @Field()
  @Property({default: false})
  isEnabled: boolean;

  @Field()
  @Property({nullable: true})
  averageRating: number;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();


}
