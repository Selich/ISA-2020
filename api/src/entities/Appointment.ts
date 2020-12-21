import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Prescrition } from "./Prescription";
import { User } from "./User";

@Entity()
export class Appointment extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PatientDetails)
  patient: User;

  @ManyToOne(() => User)
  doctor: User;

  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @OneToOne(() => Prescrition, item => item.appointment)
  prescription: Prescrition;

  @Column()
  type: string;

  @Column()
  score: number;

  @Column()
  price: number;

  @Column()
  report: string;

  @Column()
  isVisited: boolean;

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
