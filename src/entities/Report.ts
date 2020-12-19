import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reporting{

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
