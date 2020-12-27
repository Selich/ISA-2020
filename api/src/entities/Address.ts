import { OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToOne } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { User } from './User';
import { Pharmacy } from './Pharmacy';
import { Model } from './Model';

@ObjectType()
@Entity()
export class Address extends Model{

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => User, user => user.address )
  users: User[]

  // @Field(() => Pharmacy)
  @OneToOne(() => Pharmacy)
  pharmacy: Pharmacy

  @Field()
  @Column({ nullable: true })
  street: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  country: string;


}
