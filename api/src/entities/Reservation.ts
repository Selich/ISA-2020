import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, InputType, ObjectType } from "type-graphql";
import Patient from "./Patient";
import { Pharmacy } from "./Pharmacy";
import { Column, JoinTable, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Reservation extends MedicineList{

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.reservations,  { eager: true, cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

  @ManyToOne(() => Patient, item => item.reservations,  {  cascade: true })
  @JoinTable()
  patient: Patient;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  pickupDate: Date;

  @Field()
  @Column({nullable: true })
  isBought: boolean;

  @Field()
  @Column({nullable: true })
  totalSum: number;
}
