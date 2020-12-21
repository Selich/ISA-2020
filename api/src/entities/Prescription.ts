import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from './PatientDetails';
import { MedicineList } from './MedicineList';
import { User } from './User';
import { Appointment } from './Appointment';

@ObjectType()
@Entity()
export class Prescrition extends MedicineList{

  @ManyToOne(() => PatientDetails)
  patient: PatientDetails;

  @ManyToOne(() => User)
  employee: User;

  @OneToOne(() => Appointment, item => item.prescription)
  appointment: Appointment;

  @Field()
  isUsed: boolean;

  @Field()
  @Column()
  deadline: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
