import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class AppointmentDefinition extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  pharmacyId: number;

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
