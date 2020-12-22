import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class Offer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=>User)
    supplier: User;

    @ManyToOne(()=>Order)
    order: Order;

    @Field()
    @Column()
    state: string;

    @Column()
    price: number;

    @Column({type :Date})
    deliveryDate: Date;

    @CreateDateColumn()
    createdAt = new Date();

    @UpdateDateColumn()
    updatedAt = new Date();

}