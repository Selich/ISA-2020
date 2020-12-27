import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { MedicineItem } from './MedicineItem';
import { Model } from './Model';

@ObjectType()
@Entity()
export class MedicineList extends Model{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [MedicineItem])
  @OneToMany(() => MedicineItem, medicine => medicine.list)
  medicines: MedicineItem[];

}

