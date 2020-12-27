import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { Medicine } from './Medicine';
import { MedicineList } from './MedicineList';
import { Model } from './Model';

@ObjectType()
@Entity()
export class MedicineItem extends Model{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine, item => item.belongsTo ,{ eager: true, cascade: true, nullable:true})
  @JoinTable()
  details: Medicine;

  @Field(() => MedicineList)
  @ManyToOne(() => MedicineList, item => item.medicines ,{ eager: true, cascade: true, nullable:true})
  @JoinTable()
  list: MedicineList;

  @Field()
  @Column({ nullable: true})
  quantity: number;

  @Field()
  @Column({ nullable: true})
  price: number;

  @Field()
  @Column({ type:  'citext'})
  instructions: string;



}
