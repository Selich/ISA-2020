import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';
import { MedicineItem } from './MedicineItem';
import { PatientDetails } from './PatientDetails';
import { MedicineRequest } from './MedicineRequest';
import { Price } from './Price';

@ObjectType()
@Entity()
export class Medicine extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  code!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  type: string;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column()
  form: string;

  @Field()
  @Column()
  contents: string;

  @Field()
  @Column()
  producer: string;

  // @Field(() => File)
  // @Column()
  // image: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isPrescriptionRequired: boolean;

  @Field(() => String)
  @Column()
  info: string;

  @ManyToMany(() => PatientDetails, item => item.allergies)
  patientsAllergic: PatientDetails[];

  @OneToMany(() => MedicineRequest, item => item.medicine)
  requests: MedicineRequest[];

  @OneToMany(() => Price, item => item.medicine)
  prices: Price[];

  @OneToMany(() => MedicineItem, item => item.details)
  belongsTo: MedicineItem[];

  @Field(() => [Medicine])
  @ManyToMany(() => Medicine, item => item.alternatives, { lazy: true })
  @JoinColumn()
  alternatives: Medicine[];

  @Field(() => String)
  @Column({ type: Date })
  from: Date;

  @Field(() => String)
  @Column({ type: Date })
  until: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
