import { PrimaryKey, Property } from "@mikro-orm/core";

export class Medicine {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  // Recursive
  // @ManyToOne({

  // })
  // alternatives: Medicine;

  // @OneToMany()
  // alternatives: Medicine[];

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();
}
