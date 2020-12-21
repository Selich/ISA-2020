import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";
import { Pharmacy } from "./Pharmacy";
import { Report } from "./Report";
import { User } from "./User";

@Entity()
export class Holiday extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  employee: User;

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
