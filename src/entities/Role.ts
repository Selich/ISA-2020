import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Role {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name!: string;

  @Property()
  privilege!: string;

}
