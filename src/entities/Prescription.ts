import { OneToOne, JoinColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from './PatientDetails';
import { MedicineList } from './MedicineList';

@ObjectType()
@Entity()
export class Prescrition extends MedicineList{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  patient!: PatientDetails;

  @Field()
  isUsed: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
