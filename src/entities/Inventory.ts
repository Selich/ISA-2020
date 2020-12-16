import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Inventory{

  @PrimaryKey()
  id!: number;

  @Property()
  fk: number;

  @Property()
  type: string;

  @Property()
  medicine: number;

  @Property()
  quantity: number;
}
