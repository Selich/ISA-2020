import { User } from '../entities/User';
import {  ObjectType, Field, Mutation, Resolver, Query, Ctx, Arg} from 'type-graphql';
import { MyContext } from '../types';
import { LoginInput, RegisterInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';



@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver(User)
export class UserResolver{
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({ id: req.session.userId });
    return user;
  }

  @Query(() => [User], { nullable: true })
  users(@Ctx() { }: MyContext) {
    return User.find()
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("inputs") inputs: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const errors = validateRegister(inputs);
    if (errors) { return { errors }; }

    const user = new User();
    const hashedPassword = await argon2.hash(inputs.password);
    user.email = inputs.email;
    user.password = hashedPassword;
    user.role = "patient";

    await user.save()
    req.session.userId = user.id;


    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const user = await User.findOne({ email: inputs.email });
    if (!user) {
      return {
        errors: [ { field: "email", message: "that email doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, inputs.password);
    if (!valid) {
      return {
        errors: [ { field: "email", message: "that email doesn't exist" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
