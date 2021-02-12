import { MedicineList } from "./MedicineList";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Field, InputType, ObjectType } from "type-graphql";
import Patient from "./Patient";
import { Pharmacy } from "./Pharmacy";
import { MedicineItem } from "./MedicineItem";
import { Model } from "./Model";
import { OneToOne, JoinColumn, Column, JoinTable, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Reservation extends Model{

  @Field(() => Pharmacy)
  @ManyToOne(() => Pharmacy, item => item.reservations,  { eager: true, cascade: true })
  @JoinTable()
  pharmacy: Pharmacy;

	@Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, item => item.reservations,  {})
  @JoinTable()
  patient: Patient;

	@Field(() => MedicineItem, {nullable:true})
  @OneToOne(() => MedicineItem, item => item.reservation, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  medicineItem: MedicineItem;

	@Field(() => String, { nullable: true })
  @Column({ nullable: true })
  deadline: string;

	@Field(() => String, { nullable: true })
  @Column({ nullable: true })
  pickupDate: string;

  @Field()
  @Column({nullable: true })
  isBought: boolean;

  @Field()
  @Column({nullable: true })
  totalSum: number;
}
