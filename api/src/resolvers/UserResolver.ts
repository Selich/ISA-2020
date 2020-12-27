import { User } from '../entities/User';
import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import { UserResponse, LoginInput, UserDTO } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { getRepository } from 'typeorm';
import { PatientDetails } from '../entities/PatientDetails';
import { Address } from '../entities/Address';
import { validateLogin } from '../utils/validators/validateLogin';


@Resolver(User)
export class UserResolver {

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    return (!req.session.userId)
      ? null
      : await User.findOne({ id: req.session.userId });
  }

  @Query(() => [User], { nullable: true })
  async users(@Ctx() { req }: MyContext) {
      return await User.find({});
  }

  @Query(() => [User], { nullable: true })
  async usersBy(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ) {
      return await User.find({...inputs});
  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    let { email, password, confirmPassword, role } = inputs
    if (password === confirmPassword) { return { errors: [{ field: "confirmPassword", message: "Passwords need to match" }], }};

    let user = await User.findOne({email: email})
    password = await argon2.hash(inputs.password);
    inputs.password = password;
    (!user)
      ? user = await User.save(new User({...inputs}))
      // @ts-ignore
      : user = await User.update({id: user.id}, {...inputs})

    await Address.save(new Address({...inputs.address, user}))
    if(role === 'patient')
      await PatientDetails.save(new PatientDetails({user}))
    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const user = await User.findOneOrFail({ email: inputs.email });
    if (!user) { return { errors: [{ field: "email", message: "that email doesn't exist" }], };
    }
    const valid = await argon2.verify(user.password, inputs.password);

    if (!valid) { return { errors: [{ field: "email", message: "that email doesn't exist" }], };
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

  //TODO: #42
  @Mutation(() => UserResponse)
  async updateProfile(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<any> {

    return
  }
  @Mutation(() => UserResponse)
  async changePass(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<any> {

    return
  }
}
