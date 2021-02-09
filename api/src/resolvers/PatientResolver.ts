import Patient from '../entities/Patient';
import { Mutation, Resolver, Query, Ctx, Arg, InputType, Field } from 'type-graphql';
import argon2 from 'argon2'
import { RegisterPatientDTO, UserDTO, UserResponse } from './types/dtos';
import { MyContext } from '../types';
import nodemailer from 'nodemailer'
import { Address } from '../entities/Address';
import User from '../entities/User';
import {Tier} from '../entities/Tier';


@Resolver(Patient)
export class PatientResolver {

	
  @Query(() => Patient, { nullable: true })
  me(@Ctx() { req }: MyContext) {
		return Patient.find({id: req.session.userId});
  }


  @Query(() => [Patient], { nullable: true })
  async patients(
    @Arg("inputs") inputs: UserDTO,
  ) {
    return await Patient.find({ ...inputs });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("telephone") telephone: string,
    @Arg("street") street: string,
    @Arg("city") city: string,
    @Arg("country") country: string,
    @Ctx() { req, mailer }: MyContext
  ) {
    // let { street, city, country } = address
    let user = await Patient.findOne({ email: email })
    if (!(password === confirmPassword)) { return { errors: [{ field: "confirmPassword", message: "Passwords need to match" }], } };
    if (!(user === undefined)) { return { errors: [{ field: "email", message: "Email already exists" }], } };



    if (user === undefined) {
      let user = new Patient()
      user.password = await argon2.hash(password);
      user.email = email
			user.firstName = firstName
			user.lastName = lastName
			user.telephone = telephone
      user.role = 'patient'
	    user.tier = await Tier.findOneOrFail({ id: 1 })

			let address = { street, city, country }

      let temp = await Address.findOne({ ...address })
      if (temp === undefined)
         user.address = await Address.save(new Address({ street, city, country, user: user }))
      else
         user.address = temp

      user = await Patient.save(new Patient({ ...user, isEnabled: true }))



			let msg = '<h3> Hello '+ user.email.split('@')[0] +'<h3>' + '<a href="http://localhost:3000/verify/' + user.email + '">' +  'Confirm Account' + '</a>'
			let to = user.email

    //@ts-ignore
    let info = await mailer.sendMail({
      from: '"Barry Littel 👻" <barry85@ethereal.email>', // sender address
      to: to,
      subject: "Confirm your account ✔", // Subject line
      text: "Confirm your account", // plain text body
      html: msg
    })

			console.log("Message sent: " + info.messageId);
			console.log(nodemailer.getTestMessageUrl(info))



    }






    return { user }
  }
  @Mutation(() => UserResponse)
  async confirmRegistration(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ) {
    let user = await Patient.findOne({ email });
    if (user !== undefined) {
			user.isEnabled = true
			user = await Patient.save(user)

			req.session.userId = user.id
		}

    return { user }


  }


  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: UserDTO,
    @Ctx() { req }: MyContext
  ) {
    let { email, password } = inputs

		const user = await Patient.findOne({ email: email });
    if (user === undefined) { return { errors: [{ field: "email", message: "No user with that email" }], } };
    if (user.isEnabled === false) { return { errors: [{ field: "email", message: "Email not verified" }], } };

		if (user?.role === 'patient'){
			const user = await Patient.findOne({ email });
			if (!user?.isEnabled) {
				return { errors: [{ field: "email", message: "email doesn't exist" }], };
			}

		}
		const valid = argon2.verify(user.password, password);

		if (!valid) {
			return { errors: [{ field: "email", message: "pass doesn't exist" }], };
		}
		console.log("-----------------")
		console.log(user)

		/*
		const token = jwt.sign({
			email: user.email, password: user.email, role:user.role 
		}, 'token_secret')
		*/

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
  @Mutation(() => UserResponse)
  async updateProfile(
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("telephone") telephone: string,
    @Arg("street") street: string,
    @Arg("city") city: string,
    @Arg("country") country: string,
    @Ctx() { req, mailer }: MyContext
  ) {
    // let { street, city, country } = address
    let user = await Patient.findOne({ email: email })
    if (!(password === confirmPassword)) { return { errors: [{ field: "confirmPassword", message: "Passwords need to match" }], } };
    if (!(user === undefined)) { return { errors: [{ field: "email", message: "Email already exists" }], } };


    if (user === undefined) {
      let user = new Patient()
      user.password = await argon2.hash(password);
      user.email = email
      user.role = 'patient'
			let address = { street, city, country }


      let temp = await Address.findOne({ ...address })
      if (temp === undefined)
        inputs.address = await Address.save(new Address({ street, city, country, user: user }))
      else
        inputs.address = temp

      user = await Patient.save(new Patient({ ...user, isEnabled: false }))



			let msg = '<h3> Hello '+ user.email.split('@')[0] +'<h3>' + '<a href="http://localhost:3000/verify/' + user.email + '">' +  'Confirm Account' + '</a>'
			let to = user.email

    //@ts-ignore
    let info = await mailer.sendMail({
      from: '"Barry Littel 👻" <barry85@ethereal.email>', // sender address
      to: to,
      subject: "Confirm your account ✔", // Subject line
      text: "Confirm your account", // plain text body
      html: msg
    })

			console.log("Message sent: " + info.messageId);
			console.log(nodemailer.getTestMessageUrl(info))

    }
}
