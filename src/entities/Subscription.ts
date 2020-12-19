import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import { Pharmacy } from './Pharmacy';
import { PatientDetails } from './PatientDetails';

@ObjectType()
@Entity()
export class Subscription extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  user: PatientDetails;

  @Field()
  @Column()
  isEnabled: boolean

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}

