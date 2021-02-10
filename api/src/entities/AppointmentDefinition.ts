import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@ObjectType()
@Entity()
export class AppointmentDefinition extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ nullable: true })
  score: number;

  @Field()
  @Column({ type: Date })
  from: Date;

  @Field()
  @Column({ type: Date })
  until: Date;

  @Field()
  @Column()
  pharmacyId: number;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

}
