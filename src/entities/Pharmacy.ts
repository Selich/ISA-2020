import { Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Rating } from "./Rating";
import { Reservation } from "./Reservation";

@Entity()
export class Pharmacy {

  @PrimaryGeneratedColumn()
  id!: number;

  // @Column(())
  // address: Address;

  @Column()
  long: number;

  @Column()
  lat: number;

  @OneToMany(() => Reservation, item => item.patient)
  prescritions: Reservation[];

  @OneToMany(() => Rating, item => item.pharmacy)
  ratings: Rating[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}

