import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { MedicineDetails } from './MedicineDetails';
import { MedicineList } from './MedicineList';

@ObjectType()
@Entity()
export class Medicine extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => MedicineDetails)
  @ManyToOne(() => MedicineDetails, item => item.belongsTo ,{ eager: true, cascade: true, nullable:true})
  @JoinTable()
  details: MedicineDetails;

  @Field(() => MedicineList)
  @ManyToOne(() => MedicineList, item => item.medicines ,{ eager: true, cascade: true, nullable:true})
  @JoinTable()
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
