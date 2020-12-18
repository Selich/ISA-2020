import { Complaint } from "./Complaint";
import { Medicine } from "./Medicine";
import { Rating } from "./Rating";
import { Tier } from "./Tier";
import { Appointment } from "./Appointment";
import { User } from "./User";
import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';


@ObjectType()
@Entity()
export class PatientDetails{

  // @OneToMany(() => Appointment, (appointment) => appointment.patient)
  // @OneToMany(() => Rating, (rating) => rating.patient)
  // @Property()
  // ratings: Rating[];
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // allergies: Medicine[];

  // @OneToMany(() => Timeslot, (timeslot) => timeslot.patient)
  // @Property()
  // complaints: Complaint[];

  // @Property()
  // tier: Tier;

  @Column()
  score: number;

  @Column()
  penalty: number;

}
