import { Entity, Property } from "@mikro-orm/core";
import { Complaint } from "./Complaint";
import { Medicine } from "./Medicine";
import { Rating } from "./Rating";
import { Tier } from "./Tier";
import { Appointment } from "./Appointment";
import { User } from "./User";


@Entity()
export class PatientDetails extends User{

  // @OneToMany(() => Appointment, (appointment) => appointment.patient)
  @Property()
  schedule: Appointment[];

  // @OneToMany(() => Rating, (rating) => rating.patient)
  // @Property()
  // ratings: Rating[];

  @Property()
  allergies: Medicine[];

  // @OneToMany(() => Timeslot, (timeslot) => timeslot.patient)
  @Property()
  complaints: Complaint[];

  @Property()
  tier: Tier;

  @Property()
  score: number;

  @Property()
  penalty: number;

}
