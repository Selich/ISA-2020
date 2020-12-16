import { Entity, PrimaryKey, Property } from "@mikro-orm/core";



@Entity()
export class Tier {

  @PrimaryKey()
  id!: number;

  @Property()
  name: String;

  @Property()
  discount: number;

  @Property()
  score: number;

}
