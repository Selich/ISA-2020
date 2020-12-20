import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { MedicineDetails } from "./MedicineDetails";
import { Pharmacy } from "./Pharmacy";

@Entity()
export class Price {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;

  @ManyToOne(()=>MedicineDetails)
  medicine:MedicineDetails;

  @ManyToOne(()=>Pharmacy)
  pharmacy:Pharmacy;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();
}