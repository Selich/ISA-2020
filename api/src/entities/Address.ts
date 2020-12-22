import { OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Pharmacy } from './Pharmacy';

@ObjectType()
@Entity()
export class Address extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => User, user => user.address )
  users: User[]

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}