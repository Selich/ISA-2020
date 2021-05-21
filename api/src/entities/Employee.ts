import { ObjectType, Field, InputType } from "type-graphql";
import { ChildEntity, ManyToOne, Entity, OneToMany, Column } from "typeorm";
import { Appointment } from "./Appointment";
import { Holiday } from "./Holiday";
import { MedicineRequest } from "./MedicineRequest";
import { Rating } from "./Rating";
import { Pharmacy } from "./Pharmacy";
import { Complaint } from "./Complaint";
import User from "./User";
import { WorkingHours } from "./WorkingHours";

@ObjectType()
@ChildEntity()
export class Employee extends User {

	@Field(() => [Holiday], {nullable: true})
  @OneToMany(() => Holiday, item => item.employee, {nullable: true})
  holidays: Holiday[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.employee, {nullable: true})
  ratings: Rating[];

  @OneToMany(() => Complaint, item => item.employee)
  complaints: Complaint[];

	@OneToMany(() => Appointment, item => item.employee, {nullable: true})
  schedule: Appointment[];

	@Field(() => [WorkingHours], { nullable: true })
	@OneToMany(() => WorkingHours, item => item.employee, {nullable: true, eager: true, cascade:true})
  workingHours: WorkingHours[];

  @Field(() =>  [MedicineRequest])
  @OneToMany(() => MedicineRequest, item => item.employee, {nullable: true})
  requests: MedicineRequest[];

	@Field(() => Pharmacy, {nullable: true})
	@ManyToOne(() => Pharmacy, {nullable:true, eager:true})
  pharmacy: Pharmacy;

  @Field()
  @Column({ default: 0, nullable: true} )
  averageRating: number;


}
