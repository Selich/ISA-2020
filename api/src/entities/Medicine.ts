import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { MedicineItem } from './MedicineItem';
import Patient from './Patient';
import { MedicineRequest } from './MedicineRequest';
import { Price } from './Price';
import { Rating } from './Rating';
import { Model } from './Model';

@ObjectType()
@Entity()
export class Medicine extends Model {

  @Field(() => String)
  @Column({ unique: true })
  code: string;

  @Field(() => String, {nullable: true})
  @Column({ nullable: true})
  name: string;

	@Field(() => String, {nullable: true})
  @Column({ nullable: true})
  kind: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  points: number;

	@Field({nullable: true})
  @Column({ nullable: true})
  form: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  contents: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  producer: string;

	@Field({nullable: true})
  @Column({ nullable: true})
  rating: number;


	@Field(() => Boolean, {nullable: true})
	@Column({ default: false, nullable:true })
  isPrescriptionRequired: boolean;

	@Field(() => String, {nullable: true})
  @Column({ nullable: true})
  info: string;

  @ManyToMany(() => Patient, item => item.allergies, { nullable: true})
  patientsAllergic: Patient[];

  @OneToMany(() => MedicineRequest, item => item.medicine, {nullable: true})
  requests: MedicineRequest[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, item => item.medicine,{nullable: true})
  ratings: Rating[];

  @OneToMany(() => MedicineItem, item => item.details, { nullable: true})
  belongsTo: MedicineItem[];

  @ManyToMany(() => Medicine, item => item.alternatives, { lazy: true ,  nullable: true})
  @JoinColumn()
  alternatives: Medicine[];

}
