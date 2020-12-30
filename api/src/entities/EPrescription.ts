import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import Patient from './Patient';
import { Employee } from './Employee';

@ObjectType()
@Entity()
export class EPrescrition{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Employee, { nullable: true })
  employee: Employee;

  @Field()
  @Column()
  isUsed: boolean;

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
