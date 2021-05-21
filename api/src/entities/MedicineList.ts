import { TableInheritance, JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { MedicineItem } from './MedicineItem';
import { Model } from './Model';

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export  class MedicineList extends Model{

	@Field(() => [MedicineItem], {nullable:true})
	@OneToMany(() => MedicineItem, medicine => medicine.list, {eager: true, cascade:true})
  medicines: MedicineItem[];

}

