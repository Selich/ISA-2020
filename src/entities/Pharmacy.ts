import { PrimaryKey, Property } from "@mikro-orm/core";
import { Address } from "./Address";

export class Pharmacy {

  @PrimaryKey()
  id!: number;

  @Property()
  address: Address;

  @Property()
  long: number;

  @Property()
  lat: number;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();


}

