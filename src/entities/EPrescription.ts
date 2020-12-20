import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from './PatientDetails';
import { User } from './User';

@ObjectType()
@Entity()
export class EPrescrition{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  patient: PatientDetails;

  @ManyToOne(() => User, { nullable: true })
  employee: User;

  //New,Approved,Denied
  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  hashCode: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();



}
