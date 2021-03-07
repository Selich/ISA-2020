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
export default class User extends Model {
  @Field(() => Boolean)
  @Column({ default: false })
  isEnabled: boolean;

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field(() => Address)
	@ManyToOne(() => Address, item => item.users,  { eager: true, cascade: true, nullable:true })
  @JoinTable()
  address: Address;

  @Field()
  @Column({ nullable: true })
  telephone: string;

}
