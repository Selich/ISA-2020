import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Inventory{

  @PrimaryKey()
  id!: number;

  @Property()
  pharmacyID: number;

  @Property()
  supplierID: number;

  @Property()
  type: string;

  @Property()
  medicine: number;

  @Property()
  quantity: number;

  @Property()
  price: number;
}
