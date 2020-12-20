import { JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm'
import { Address } from "./Address";
import { ObjectType, Field, ID } from 'type-graphql';
import { PatientDetails } from "./PatientDetails";
import { Appointment } from "./Appointment";
import { Rating } from './Rating';
import { Holiday } from './Holiday';
import { WorkingHours } from './WorkingHours';
import { Inventory } from './Inventory';
import { Complaint } from './Complaint';
import { Medicine } from './Medicine';
import { MedicineRequest } from './MedicineRequest';
import { Order } from './Order';
import { Offer } from './Offer';

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true})
  role: string;

  @Field()
  @Column({ nullable: true})
  firstName: string;

  @Field()
  @Column({ nullable: true})
  lastName: string;

  //Za farmaceuta i dermatologa-radno vreme, Za Admina apoteke-veza ka JEDNOJ apoteci za koju je zaduzen
  @ManyToMany(()=>WorkingHours)
  workingHours:WorkingHours[];

  

  @OneToOne(() => Inventory, item=>item.supplier)
  inventory: Inventory;

  @OneToMany(() => Holiday, item => item.employee)
  holidays: Holiday[];

  @OneToMany(() => Rating, item => item.doctor)
  ratings: Rating[];

  @OneToMany(() => Appointment, item => item.doctor)
  schedule: Appointment[];

  @OneToMany(()=>Complaint,item=>item.doctor)
  complaints: Complaint[];

  @OneToMany(() => MedicineRequest,item=>item.doctor)
  requests: MedicineRequest[];

  @OneToMany(() => Order,item=>item.admin)
  orders: Order[];

  @OneToMany(()=>Offer,item=>item.supplier)
  offers: Offer[];
  
  @OneToOne(() => PatientDetails)
  @JoinColumn()
  details: PatientDetails;

  @Field()
  @Column({ nullable: true})
  gender: string;

  @Field()
  @Column({ type: 'date', nullable: true})
  dateOfBirth: Date;

  @ManyToOne(() => Address)
  address: Address;

  @Field()
  @Column({ nullable: true})
  telephone: string;

  @Field()
  @Column({ default: false })
  isEnabled: boolean;

  @Field()
  @Column({ default: 0 })
  averageRating: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
