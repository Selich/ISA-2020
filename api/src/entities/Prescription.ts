import { CreateDateColumn, UpdateDateColumn, Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { ObjectType, Field, InputType } from 'type-graphql';
import  Patient  from "./Patient";
import { MedicineList } from './MedicineList';
import { Appointment } from './Appointment';
import { Employee } from './Employee';

@ObjectType()
@Entity()
export class Prescrition extends MedicineList{

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Employee)
  employee: Employee;

  @OneToOne(() => Appointment, item => item.prescription)
  appointment: Appointment;

  @Field()
  @Column()
  isUsed: boolean;

  @Field()
  @Column()
  hashCode: string;

  @Field()
  @Column()
  deadline: Date;

}
