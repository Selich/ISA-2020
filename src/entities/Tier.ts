import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientDetails } from "./PatientDetails";

@Entity()
export class Tier {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: String;

  @Column()
  discount: number;

  @Column()
  minScore: number;

  @Column()
  maxScore: number;

  @OneToMany(() => PatientDetails, item => item.tier)
  patients: PatientDetails[];

}
