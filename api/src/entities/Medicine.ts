import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import { MedicineItem } from './MedicineItem';
import { PatientDetails } from './PatientDetails';
import { MedicineRequest } from './MedicineRequest';
import { Price } from './Price';
import { Model } from './Model';

@ObjectType()
@Entity()
export class Medicine extends Model {

  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  code!: string;

  @Field(() => String)
  @Column({ nullable: true})
  name!: string;

  @Field(() => String)
  @Column({ nullable: true})
  type: string;

  @Field()
  @Column({ nullable: true})
  points: number;

  @Field()
  @Column({ nullable: true})
  form: string;

  @Field()
  @Column({ nullable: true})
  contents: string;

  @Field()
  @Column({ nullable: true})
  producer: string;

  // @Field(() => File)
  // @Column()
  // image: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isPrescriptionRequired: boolean;

  @Field(() => String)
  @Column({ nullable: true})
  info: string;

  @ManyToMany(() => PatientDetails, item => item.allergies, { nullable: true})
  patientsAllergic: PatientDetails[];

  @OneToMany(() => MedicineRequest, item => item.medicine, {nullable: true})
  requests: MedicineRequest[];

  @OneToMany(() => Price, item => item.medicine, { nullable: true})
  prices: Price[];

  @OneToMany(() => MedicineItem, item => item.details, { nullable: true})
  belongsTo: MedicineItem[];

  @ManyToMany(() => Medicine, item => item.alternatives, { lazy: true ,  nullable: true})
  @JoinColumn()
  alternatives: Medicine[];

  @Field(() => String)
  @Column({ type: Date,  nullable: true})
  from: Date;

  @Field(() => String)
  @Column({ type: Date, nullable: true})
  until: Date;

}
