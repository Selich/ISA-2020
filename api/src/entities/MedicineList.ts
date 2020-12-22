import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { MedicineItem } from './MedicineItem';

@ObjectType()
@Entity()
export class MedicineList extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [MedicineItem])
  @OneToMany(() => MedicineItem, medicine => medicine.list)
  medicines: MedicineItem[];

}

