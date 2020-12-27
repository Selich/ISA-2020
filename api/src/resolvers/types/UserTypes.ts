import { User } from '../../entities/User';
import { InputType, Field, ObjectType } from 'type-graphql';
import { FieldError } from './ErrorTypes';
import { Address } from '../../entities/Address';

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
export class DoctorDTO {
  @Field({nullable: true})
  id: number
  @Field({nullable: true})
  email: string
  @Field({nullable: true})
  firstName: string
  @Field({nullable: true})
  lastName: string
}
@InputType()
export class AddressDTO {
  @Field({ nullable: true})
  street: string;
  @Field({ nullable: true})
  country: string;
  @Field({ nullable: true})
  city: string;
}

@InputType()
export class UserDTO {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true})
  confirmPassword: string;
  @Field({ nullable: true})
  firstName: string;
  @Field({ nullable: true})
  lastName: string;
  @Field({ nullable: true})
  telephone: string;
  @Field({ nullable: true})
  gender: string;
  @Field(() => AddressDTO, {nullable: true})
  address: Address;
  @Field({ nullable: true})
  role: string;
  @Field({ nullable: true})
  dateOfBirth: string;
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

