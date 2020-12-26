import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";
import { Rating } from './Rating';
import { Holiday } from './Holiday';
import { WorkingHours } from './WorkingHours';
import { MedicineRequest } from './MedicineRequest';

// ! WORKS, DONT TOUCH
@ObjectType()
@Entity()
export class User extends BaseEntity {

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
  @Column({ nullable: true })
  role: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field(() => [Holiday])
  @OneToMany(() => Holiday, item => item.employee)
  holidays: Holiday[];

  @OneToMany(() => Rating, item => item.doctor)
  ratings: Rating[];

  @OneToMany(() => Appointment, item => item.doctor)
  schedule: Appointment[];

  @Field(() => [WorkingHours])
  @OneToMany(() => WorkingHours, item => item.doctorID)
  workingHours: WorkingHours[];

  @Field(() =>  [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.user)
  requests: MedicineRequest[];

  @Field(() => PatientDetails)
  @OneToOne(() => PatientDetails, item => item.user ,{ eager: true, cascade: true, nullable:true})
  @JoinColumn()
  details: PatientDetails;

  @Field()
  @Column({ nullable: true })
  gender: string;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Field(() => Address)
  @ManyToOne(() => Address, item => item.users,  { eager: true, cascade: true })
  @JoinTable()
  address: Address;

  @Field()
  @Column({ nullable: true })
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
