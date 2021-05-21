import { ChildEntity, Column, Entity, Generated, ManyToOne, OneToOne } from 'typeorm'
import { ObjectType, Field } from 'type-graphql';
import  Patient  from "./Patient";
import { MedicineList } from './MedicineList';
import { Appointment } from './Appointment';
import { Employee } from './Employee';

@ObjectType()
@ChildEntity()
export class Prescription extends MedicineList{

  @Field(() => Patient)
  @ManyToOne(() => Patient)
  patient: Patient;

  @Field(() => Employee)
  @ManyToOne(() => Employee)
  employee: Employee;

  @Field(() => Appointment)
  @OneToOne(() => Appointment, item => item.prescription)
  appointment: Appointment;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column(() => Boolean)
  isUsed: boolean;

  @Field()
  @Generated("uuid")
  hashCode: string;

  @Field(() => String, {nullable: true, defaultValue: null})
  @Column({nullable: true})
  deadline: Date;

}
