import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Int, ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Medicine extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  type: string;

  // Recursive
  // @ManyToOne({

  // })
  // alternatives: Medicine;

  // @OneToMany()
  // alternatives: Medicine[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();


}
