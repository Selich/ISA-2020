import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Field()
  @Column()
  isApproved: boolean;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
