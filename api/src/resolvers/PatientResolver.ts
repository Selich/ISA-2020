import Patient from '../entities/Patient';
import { Mutation, Resolver, Query, Ctx, Arg, InputType, Field } from 'type-graphql';
import argon2 from 'argon2'
import { RegisterPatientDTO, UserDTO, UserResponse } from './types/dtos';
import { MyContext } from '../types';
import { Address } from '../entities/Address';
import User from '../entities/User';


@Resolver(Patient)
export class PatientResolver {

  @Query(() => [Patient], { nullable: true })
  async patients(
    @Arg("inputs") inputs: UserDTO,
  ) {
    return await Patient.find({...inputs});
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("inputs") inputs: RegisterPatientDTO,
    @Ctx() { req, mailer }: MyContext
  ) {
    let { email, password, confirmPassword, address } = inputs
    let { street, city, country } = address
    let user = await Patient.findOne({email: email})
    if (!(password === confirmPassword)) { return { errors: [{ field: "confirmPassword", message: "Passwords need to match" }], } };
    if (!(user === undefined)) { return { errors: [{ field: "email", message: "Email already exists" }], } };

    inputs.password = await argon2.hash(inputs.password);
    inputs.role = 'patient'


    user = await Patient.save(new Patient({ ...inputs }))
    let temp = await Address.findOne({...address})
    if(temp === undefined)
      inputs.address = await Address.save(new Address({ street, city, country, user: user }))
    else
      inputs.address = temp

    user = await Patient.save(new Patient({ ...inputs, isEnables:false }))

		let info = await mailer.send({
			from: '"ISA-Service" <foo@someaddrs.com>',


		})
    return { user }
  }
  @Mutation(() => UserResponse)
  async confirmRegistration(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ){

	}
	

  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ){
    let { email, password } = inputs

    const user = await Patient.findOne({ email });


    if (user==undefined) {
      return { errors: [{ field: "email", message: "email doesn't exist" }], };
    }
    const valid = argon2.verify(user.password, password);

    if (!valid) {
      return { errors: [{ field: "email", message: "pass doesn't exist" }], };
    }

    req.session.userId = user.id;
    return { user }
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

  // //TODO: #42
  // @Mutation(() => UserResponse)
  // async updateProfile(
  //   @Arg("inputs") inputs: LoginInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<any> {

  //   return
  // }
  // @Mutation(() => UserResponse)
  // async changePass(
  //   @Arg("inputs") inputs: LoginInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<any> {

  //   return
  // }
}
