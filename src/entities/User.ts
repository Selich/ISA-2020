import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from "./Address";
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field()
  // @Column()
  // details: PatientDetails;

  // @Field()
  // @Column()
  // schedule: Appointment[];

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

  @Field()
  @Column({ nullable: true})
  gender: string;

  // // @Field()
  // // @Column()
  // // dateOfBirth: Date;

  // // @Field()
  // // @Column()
  // // address: Address;

  @Field()
  @Column({ nullable: true})
  telephone: string;

  @Field()
  @Column()
  isEnabled: boolean;

  @Field()
  @Column()
  averageRating: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
