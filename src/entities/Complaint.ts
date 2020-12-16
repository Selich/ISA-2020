import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";


@Entity()
export class Complaint{

  @PrimaryKey()
  id!: number;

  @Property()
  description: string;

  @Property()
  doctor: User;

  @Property()
  pharmacy: Pharmacy;

}
