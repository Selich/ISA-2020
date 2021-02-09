import { VersionColumn,JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, BeforeInsert } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql';


@ObjectType()
@Entity()
export abstract class Model extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => ID)
  @VersionColumn()
  version!: number;

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
}

