import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';
import { Medicine } from './Medicine';
import { PatientDetails } from './PatientDetails';

@ObjectType()
@Entity()
export class MedicineDetails{

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

  @Field(() => String)
  @Column()
  form: string;

  @Field(() => String)
  @Column()
  contents: string;

  @Field(() => String)
  @Column()
  producer: string;

  @Field(() => Boolean)
  @Column({default: false})
  isPrescriptionRequired: boolean;

  @Field(() => String)
  @Column()
  info: string;

  @ManyToMany(() => PatientDetails, item => item.allergies)
  patientsAllergic: PatientDetails[];

  @OneToMany(() => Medicine, item => item.details)
  belongsTo: Medicine[];

  @Column({ type: Date })
  from: Date;

  @Column({ type: Date })
  until: Date;


  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
