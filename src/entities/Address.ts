import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Address {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();

  @Property()
  street: string;

  @Property()
  city: string;

  @Property()
  country: string;


}
