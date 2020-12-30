import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, Column } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class Holiday extends Model{

  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Employee)
  @ManyToOne(() => Employee, item => item.holidays)
  @JoinTable()
  employee: Employee;

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
