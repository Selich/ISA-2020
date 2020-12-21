import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";
import { Rating } from './Rating';
import { Holiday } from './Holiday';
import { WorkingHours } from './WorkingHours';

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true})
  role: string;

  @Field()
  @Column({ nullable: true})
  firstName: string;

  @Field()
  @Column({ nullable: true})
  lastName: string;

  @OneToMany(() => Holiday, item => item.employee)
  holidays: Holiday[];

  @OneToMany(() => Rating, item => item.doctor)
  ratings: Rating[];

  @OneToMany(() => Appointment, item => item.doctor)
  schedule: Appointment[];

  @OneToMany(() => WorkingHours, item => item.doctorID)
  workingHours: WorkingHours[];

  @OneToOne(() => PatientDetails)
  @JoinColumn()
  details: PatientDetails;

  @Field()
  @Column({ nullable: true})
  gender: string;

  @Field()
  @Column({ type: 'date', nullable: true})
  dateOfBirth: Date;

  @ManyToOne(() => Address)
  address: Address;

  @Field()
  @Column({ nullable: true})
  telephone: string;

  @Field()
  @Column({ default: false })
  isEnabled: boolean;

  @Field()
  @Column({ default: 0 })
  averageRating: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
