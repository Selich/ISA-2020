import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class WorkingHours extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, item => item.workingHours)
  @JoinTable()
  doctorID: User;

  @Field()
  @Column()
  pharmacyID: number;

  @Field()
  @Column()
  from: Date;

  @Field()
  @Column()
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();


}
