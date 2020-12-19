import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { Medicine } from './Medicine';

@Entity()
export class MedicineList {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  // @OneToMany(() => Medicine, medicine => medicine.)
  medicines: Medicine[];

}

