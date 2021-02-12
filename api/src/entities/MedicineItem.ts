import { OneToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { Medicine } from './Medicine';
import { MedicineList } from './MedicineList';
import { Model } from './Model';
import { Inventory } from './Inventory';
import { Price } from './Price';
import { Reservation } from './Reservation';

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

  @Field(() => Inventory)
  @ManyToOne(() => Inventory, item => item.medicines ,{ nullable:true})
  @JoinTable()
  list: Inventory;

  @Field(() => Reservation)
	@OneToOne(() => Reservation, {nullable:true})
  @JoinTable()
  reservation: Reservation

	@Field({nullable: true})
  @Column({ nullable: true})
  quantity: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  currentPrice: number;

	@Field(() => [Price], {nullable: true})
	@OneToMany(() => Price, item => item.medicineItem, { nullable: true, eager:true, cascade:true})
  prices: Price[];

	@Field(() => String, {nullable:true})
  @Column({ nullable: true})
  dateOfPurchase: string;

	@Field({nullable: true})
	@Column({ nullable: true })
  instructions: string;



}
