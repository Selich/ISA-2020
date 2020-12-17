import { InputType, Field } from 'type-graphql';

@InputType()
export class AppointmentInput {

  @Field()
  dermId: number;

  @Field()
  pharmacyId: string;

  @Field(() => Date)
  from!: Date;

  @Field(() => Date)
  until!: Date;

}

