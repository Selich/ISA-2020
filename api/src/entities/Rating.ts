import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@ObjectType()
@Entity()
export class Rating {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  patient: PatientDetails;

  @ManyToOne(() => User, {nullable: true})
  doctor: User;

  @ManyToOne(() => Pharmacy, {nullable: true})
  pharmacy: Pharmacy;

  @Field()
  @Column()
  complain: string;

  @Field()
  @Column()
  score: number;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();


}
