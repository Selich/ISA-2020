import { PrimaryKey, Property } from "@mikro-orm/core";
import { Int, ObjectType, Field } from 'type-graphql';

export class Medicine {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String)
  @Property()
  type: string;

  // Recursive
  // @ManyToOne({

  // })
  // alternatives: Medicine;

  // @OneToMany()
  // alternatives: Medicine[];

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();
}
