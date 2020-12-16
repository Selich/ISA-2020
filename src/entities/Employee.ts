import { PrimaryKey, Property } from "@mikro-orm/core";

export class Employee {

  @PrimaryKey()
  id!: number;

  // @Property()
  // type: string;

  // @Property()
  // pharmacy: Pharmacy;

  // @Property()
  // complain: string;

  // @Property()
  // score: number;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();



}
