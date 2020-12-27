import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, BeforeInsert } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";
import { Rating } from './Rating';
import { Holiday } from './Holiday';
import { WorkingHours } from './WorkingHours';
import { MedicineRequest } from './MedicineRequest';
import { IsEmail, IsEnum, Length } from 'class-validator'
import { Model } from './Model';

const roles = [
    'patient', 'derm', 'pharm', 'admin', 'sysadmin'
]

@ObjectType()
@Entity()
export class User extends Model {

  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true})
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true})
  password: string;

  @Field()
  @Column({
    type: 'enum',
    enum: roles,
    nullable: true
  })
  @IsEnum(roles)
  role: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field(() => [Holiday])
  @OneToMany(() => Holiday, item => item.employee, {nullable: true})
  holidays: Holiday[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.doctor, {nullable: true})
  ratings: Rating[];

  @OneToMany(() => Appointment, item => item.doctor, {nullable: true})
  schedule: Appointment[];

  @Field(() => [WorkingHours])
  @OneToMany(() => WorkingHours, item => item.doctor, {nullable: true})
  workingHours: WorkingHours[];

  @Field(() =>  [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.user, {nullable: true})
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
  @Column({ default: 0, nullable: true} )
  averageRating: number;


}
