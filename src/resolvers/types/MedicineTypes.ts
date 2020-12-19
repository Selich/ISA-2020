import { Int, InputType, Field, Float } from 'type-graphql';

@InputType()
export class MedicineInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  type: string;
}

@InputType()
export class MedicineDetailsInput {
  @Field(() => String)
  code: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  type: string;
  @Field(() => Float)
  points: number;
  @Field(() => String)
  form: string;
  @Field(() => String)
  contents: string;
  @Field(() => String)
  producer: string;
  @Field(() => String)
  info: string;
}
