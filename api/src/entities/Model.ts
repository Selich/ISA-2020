import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, BeforeInsert } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";
import { Rating } from './Rating';
import { Holiday } from './Holiday';
import { WorkingHours } from './WorkingHours';
import { MedicineRequest } from './MedicineRequest';
import { v4 as uuid } from 'uuid'


@ObjectType()
@Entity()
export abstract class Model extends BaseEntity {

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  constructor(model?: Partial<any>) {
    super()
    Object.assign(this, model)
  }

  toJSON() {
    return { ...this, id: undefined }
  }

}

