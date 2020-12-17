import { Int, InputType, Field } from 'type-graphql';

@InputType()
export class MedicineInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  type: string;
}
