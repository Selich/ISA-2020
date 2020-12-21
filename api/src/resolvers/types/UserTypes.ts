import { User } from '../../entities/User';
import { InputType, Field, ObjectType } from 'type-graphql';
import { FieldError } from './ErrorTypes';

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
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
}
@InputType()
export class EmployeeInput {
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  role: string;
}
@InputType()
export class HolidayInput {
  @Field()
  employeeId: number;
  @Field()
  from: string;
  @Field()
  until: string;
}

