import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, BeforeInsert } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, IsEnum, Length } from 'class-validator'
import { Model } from './Model';

const roles = [
    'patient', 'derm', 'pharm', 'admin', 'sysadmin'
]

@ObjectType()
@Entity()
export default abstract class User extends Model {

  @Field(() => String, { nullable: true })
  @Column({ nullable: true})
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true})
  password: string;

  @Field()
  @Column({
    type: 'enum',
    enum: roles,
    nullable: true
  })
  @IsEnum(roles)
  role: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column({ nullable: true })
  gender: string;

  @Field(() => String)
  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Field(() => Address)
  @ManyToOne(() => Address, item => item.users,  { eager: true, cascade: true })
  @JoinTable()
  address: Address;

  @Field()
  @Column({ nullable: true })
  telephone: string;

}
