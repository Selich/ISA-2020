import { Entity,  PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Reservation{

  @PrimaryKey()
  id!: number;

  @Property()
  patient: number;

  @Property()
  medicine: number;

  @Property()
  quantity: number;

  @Property()
  isDelivered: boolean;
}
