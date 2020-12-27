import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@ObjectType()
@Entity()
export class Holiday extends Model{

  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, item => item.holidays)
  @JoinTable()
  user: User;

  @Field(() => String)
  @Column({ type: Date, nullable: true})
  from: Date;

  @Field(() => String)
  @Column({ type: Date,nullable: true})
  until: Date;

  @Field()
  @Column({nullable: true})
  isApproved: boolean;

}
