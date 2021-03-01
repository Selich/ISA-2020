import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import Patient from './Patient';
import { Employee } from './Employee';
import { Pharmacy } from './Pharmacy';
import { Model } from './Model';

const status = [
    'patient', 'derm', 'pharm', 'admin', 'sysadmin'
]

@ObjectType()
@Entity()
export class EPrescription extends Model{

	@Field(() => Patient, {nullable: true})
  @ManyToOne(() => Patient)
  patient: Patient;

	@Field(() => Pharmacy, {nullable: true})
  @ManyToOne(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field()
	@Column({nullable: true})
  hashCode: string

  @Field()
	@Column({nullable: true})
  dateOfGrant: string

  @Field()
	@Column({nullable: true})
  status: string

}
