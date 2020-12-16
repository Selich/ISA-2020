import { PrimaryKey, Property } from "@mikro-orm/core";

export class WorkingHours {

  @PrimaryKey()
  id!: number;

  @Property()
  doctorID: number;

  @Property()
  pharmacyID: number;

  @Property({ type: Date })
  from: Date;

  @Property({ type: Date })
  until: Date;

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();


}
