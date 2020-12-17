import { User } from '../entities/User';
import { ObjectType, InputType, Field, Mutation, Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import { MyContext } from '../types';
import { LoginInput, RegisterInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { validateLogin } from '../utils/validators/validateLogin';

@ObjectType()
class UserResponse {
  @Field(() => [Error], {nullable: true})
  errors?: Error[]
  @Field(() => User, { nullable: true})
  user?: User
}

@Resolver()
export class UserResolver{
  @Query(() => [User])
  users(
    @Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {})
  }

  @Query(() => User, {nullable: true})
  user(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext): Promise<User | null> {
    return em.findOne(User, {id})
  }

  @Mutation(() => User)
  async register(
    @Arg("inputs") inputs: RegisterInput,
    @Ctx() { em }: MyContext
  ){
    const errors = validateRegister(inputs);
    if (errors) return errors;

    const tempUser = await em.findOne(User, {email: inputs.email})
    if (tempUser) return {
      errors: [
        { field: "email", message: "user exists"}
      ]
    }

    const hashpass = await argon2.hash(inputs.password)
    const user = em.create(User, {
      email: inputs.email,
      password: hashpass,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      gender: inputs.gender.toLowerCase(),
      telephone: inputs.telephone,
      isEnabled: false,
      role: inputs.role.toLowerCase(),
    });
    await em.persistAndFlush(user);
    return user;
  }
  @Mutation(() => User)
  async login(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { em }: MyContext
  ){
    const errors = validateLogin(inputs);
    if (errors) return errors;

    const tempUser = await em.findOne(User, {email: inputs.email})
    if (!tempUser) return {
      errors: [
        { field: "email", message: "bad login"}
      ]
    }

    // const valid = await argon2.verify(tempUser.password, inputs.password);
    // if (!valid) return {
    //   errors: [
    //     { field: "email", message: "invalid login"}
    //   ]
    // }
    return tempUser;
  }




}
