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

	@Field(() => Medicine, { nullable:true })
  @ManyToOne(() => Medicine, item => item.belongsTo ,{ eager: true, cascade: true, nullable:true})
  @JoinTable()
  details: Medicine;

  @Field(() => MedicineList)
  @ManyToOne(() => MedicineList, item => item.medicines ,{ nullable:true})
  @JoinTable()
  list: MedicineList;

	@Field({nullable: true})
  @Column({ nullable: true})
  quantity: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  price: number;

	@Field(() => String, {nullable:true})
  @Column({ nullable: true})
  dateOfPurchase: Date;

	@Field({nullable: true})
	@Column({ nullable: true })
  instructions: string;



}
