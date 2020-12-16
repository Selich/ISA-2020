import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Address } from "./Address";
import { PatientDetails } from "./PatientDetails";
import { Role } from "./Role";


@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: Role;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  gender: string;

  @Property({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Property()
  address: Address;

  @Property()
  telephone: number;

  // @Property()
  // details: PatientDetails;

  @Property({default: false})
  isEnabled: boolean;

  @Property({nullable: true})
  averageRating: number;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();


}
