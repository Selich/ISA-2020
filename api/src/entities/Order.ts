import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MedicineList } from "./MedicineList";
import { Offer } from "./Offer";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@ObjectType()
@Entity()
export class Order extends MedicineList {

  @ManyToOne(()=>User)
  admin: User;

  @ManyToOne(()=>Pharmacy)
  pharmacy:Pharmacy;

  @OneToMany(()=>Offer, item=>item.order)
  offer:Offer[];

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
