import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg } from "type-graphql";
import { Holiday } from "../entities/Holiday";
import { User } from "../entities/User";
import { Address } from "../entities/Address";
import { validateAdmin } from "../utils/validators/validateRegister";
import { UserResponse } from "./types/UserTypes";
import argon2 from 'argon2'
import { WorkingHours } from "../entities/WorkingHours";

@InputType()
class EmployeeInput{
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  role: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  telephone: string;
  @Field()
  gender: string;
  @Field()
  street: string;
  @Field()
  city: string;
  @Field()
  country: string;
  @Field()
  dateOfBirth: string;
}

@Resolver()
export class EmployeeResolver {

  // #43
  @Query(() => Holiday, { nullable: true })
  async holiday( @Ctx() { req }: MyContext) {
  }

  @Mutation(() => UserResponse)
  async createEmployee(
    @Arg("inputs") inputs: EmployeeInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const errors = validateAdmin(req.session.userId);

    const user = new User();
    const hashedPassword = await argon2.hash(inputs.firstName);
    user.email = inputs.email;
    user.password = hashedPassword
    user.role = inputs.role;
    user.firstName = inputs.firstName;
    user.lastName = inputs.lastName;
    const wh = new WorkingHours()
    const list : WorkingHours[] = []
    const newUser = await user.save()
    wh.doctorID = await User.findOneOrFail({id: newUser.id})
    wh.pharmacyID = 1
    const l = list.concat(wh)

    newUser.workingHours = l
    return { user };
  }

  @Mutation(() => Holiday)
  async updateEmployee(
    @Arg("input") input: EmployeeInput,
    @Ctx() { req, res }: MyContext) {
      const user = await User.findOne({ id: input.id })
      const address = await Address.findOne(
        {
          where:
          {
            street:  input.street,
            city:    input.city,
            country: input.country,
          }
        }
      )
      if(!user) return
      if(!address){
        user.address = new Address()
      }
      user.address.street = input.street
      user.address.city = input.city
      user.address.country = input.country
      user.address.save()
      user.email = input.email
      user.password = input.password
      user.firstName = input.firstName
      user.lastName = input.lastName
      user.gender = input.gender
      user.telephone = input.telephone
      user.dateOfBirth = new Date(input.dateOfBirth)
      user.save()
  }
}
