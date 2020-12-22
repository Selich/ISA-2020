import { User } from '../entities/User';
import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import { UserResponse, EmployeeInput, LoginInput, RegisterInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { getRepository } from 'typeorm';
import { PatientDetails } from '../entities/PatientDetails';
import { Address } from '../entities/Address';


@Resolver(User)
export class UserResolver {
  // ME
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    return (!req.session.userId)
    ? null
    : await User.findOne({ id: req.session.userId });
  }

  @Query(() => User, { nullable: true })
  async test(@Ctx() { req }: MyContext) {
    const user = await User.findOne({ id: 44 });
    return user
  }

  //!  DOES NOT WORK
  @Query(() => User, { nullable: true })
  async getMyProfile(@Ctx() { req }: MyContext) {
    if (!req.session.userId)
      return null
    const user = await User.findOne({ id: req.session.userId });

    return user
  }

  @Query(() => [User], { nullable: true })
  usersByPharm(
    @Arg("pharmId") pharmId: Number,
    @Arg("role") role: String,
    @Ctx() { }: MyContext
  ) {
    return getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.workingHours", "working_hours")
      .where("user.role = :role", { role: role })
      .andWhere("working_hours.pharmacyID = :ID", { ID: pharmId })
      .getMany();
  }
  @Mutation(() => UserResponse, {nullable: true})
  async register(
    @Arg("inputs") inputs: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const errors = validateRegister(inputs);
    if (errors) { return { errors }; }

    const user = new User();
    const hashedPassword = await argon2.hash(inputs.password);


    const address = await Address.findOne({where:[
      { street: inputs.street.toLowerCase()},
      { city: inputs.city.toLowerCase()},
      { country: inputs.country.toLowerCase()}
    ]})


    if(!address) {
      const newAddress = new Address()
      newAddress.street = inputs.street
      newAddress.city = inputs.city
      newAddress.country = inputs.country
      newAddress.save()
      user.address = newAddress;
    } else {
      user.address = address;
    }

    user.email = inputs.email;
    user.password = hashedPassword;
    user.firstName = inputs.firstName;
    user.lastName = inputs.lastName;
    user.telephone = inputs.telephone;
    user.gender = inputs.gender;
    user.dateOfBirth = new Date(inputs.dateOfBirth);
    user.role = "patient";

    const profile = new PatientDetails()
    profile.allergies = []
    profile.appointments = []
    profile.complaints = []
    profile.penalty = 0
    profile.prescritions = []
    profile.ratings = []
    profile.reservations = []
    profile.score = 0
    // TODO: Find what the tiers are
    // profile.tier = new Tier()
    profile.save()
    user.details = profile

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
        errors: [{ field: "email", message: "that email doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, inputs.password);
    if (!valid) {
      return {
        errors: [{ field: "email", message: "that email doesn't exist" }],
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
