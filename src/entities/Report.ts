import { Entity,  PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Report{

  @PrimaryKey()
  id!: number;

  @PrimaryKey()
  desc: string;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();

}
