import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { MedicineDetails } from './MedicineDetails';
import { MedicineList } from './MedicineList';

@ObjectType()
@Entity()
export class Medicine extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MedicineDetails)
  details: MedicineDetails;

  @ManyToOne(() => MedicineList)
  list: MedicineList;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  price: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
