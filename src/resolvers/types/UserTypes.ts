import { InputType, Field } from 'type-graphql';
@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
@InputType()
export class RegisterInput {

  @Field()
  email: string;
  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field(() => String)
  role!: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  gender: string;

  @Field()
  dateOfBirth: Date;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  telephone: string;
}

