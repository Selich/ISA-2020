import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class Order extends Model {



}
