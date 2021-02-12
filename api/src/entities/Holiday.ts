import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, Column } from "typeorm";
import { Employee } from "./Employee";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class Holiday extends Model{

	@Field(() => Employee, { nullable:true })
  @ManyToOne(() => Employee, item => item.holidays)
  @JoinTable()
  employee: Employee;

  @Field(() => String)
  @Column({nullable: true})
  from: string;

  @Field(() => String)
  @Column({nullable: true})
  until: string;

  @Field()
  @Column({nullable: true})
  isApproved: boolean;

  @Field()
  @Column({nullable: true})
  comments: string;

}
