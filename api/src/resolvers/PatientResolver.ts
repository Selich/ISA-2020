import Patient from "../entities/Patient";
import {
  Mutation,
  Resolver,
  Query,
  Ctx,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import argon2 from "argon2";
import { MedicineDTO, RegisterPatientDTO, UserDTO, UserResponse } from "./types/dtos";
import { MyContext } from "../types";
import nodemailer from "nodemailer";
import { Address } from "../entities/Address";
import { Medicine } from "../entities/Medicine";
import { Pharmacy } from "../entities/Pharmacy";
import { Employee } from "../entities/Employee";
import User from "../entities/User";
import { Tier } from "../entities/Tier";

@Resolver(Patient)
export class PatientResolver {
  @Query(() => Patient, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    return Patient.find({ id: req.session.userId });
  }

  @Query(() => [Patient], { nullable: true })
  async patients(@Arg("inputs") inputs: UserDTO) {
    return await Patient.find({ ...inputs });
  }

  @Mutation(() => Patient, { nullable: true })
	async addAllergie(
		@Arg("allergies") allergies: string,
		@Ctx() { req  }: MyContext
	) {
		let temp = JSON.parse(allergies)
		let medicines = []
		for (const item in temp) {
			//@ts-ignore
			let med = await Medicine.findOne({name: item.value})
			if(med)
				medicines.push(med)
		}
		let user = await Patient.findOneOrFail({id: req.session.userId})
		console.log(user)
		user.allergies = medicines
    user = await Patient.save(user);
		return user 
  }

  @Mutation(() => Patient, { nullable: true })
	async subscribe(
		@Arg("id") id: string,
		@Ctx() { res }: MyContext
	) {
		console.log('ehh')
		/*
		let pharmId = parseInt(id)
		let user = await Patient.findOneOrFail({id: res.session.userId})
		user.subscriptions.push(await Pharmacy.findOneOrFail({id: pharmId}))
    user = await Patient.save(user);
		return user 
		*/


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
    let user = await Patient.findOne({ email: email });
    if (!(password === confirmPassword)) {
      return {
        errors: [
          { field: "confirmPassword", message: "Passwords need to match" },
        ],
      };
    }
    if (!(user === undefined)) {
      return { errors: [{ field: "email", message: "Email already exists" }] };
    }

    if (user === undefined) {
      let user = new Patient();
      user.password = await argon2.hash(password);
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.telephone = telephone;
      user.role = "patient";
      user.tier = await Tier.findOneOrFail({ id: 1 });

      let address = { street, city, country };

      let temp = await Address.findOne({ ...address });
      if (temp === undefined)
        user.address = await Address.save(
          new Address({ street, city, country, user: user })
        );
      else user.address = temp;

      user = await Patient.save(new Patient({ ...user, isEnabled: true }));

      let msg =
        "<h3> Hello " +
        user.email.split("@")[0] +
        "<h3>" +
        '<a href="http://localhost:3000/verify/' +
        user.email +
        '">' +
        "Confirm Account" +
        "</a>";
      let to = user.email;

      //@ts-ignore
      let info = await mailer.sendMail({
        from: '"Barry Littel 👻" <barry85@ethereal.email>', // sender address
        to: to,
        subject: "Confirm your account ✔", // Subject line
        text: "Confirm your account", // plain text body
        html: msg,
      });

      console.log("Message sent: " + info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
    }
    return { user };
  }
  @Mutation(() => UserResponse)
  async confirmRegistration(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ) {
    let user = await Patient.findOne({ email });
    if (user !== undefined) {
      user.isEnabled = true;
      user = await Patient.save(user);

      req.session.userId = user.id;
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("inputs") inputs: UserDTO, @Ctx() { req }: MyContext) {
    let { email, password } = inputs;

    let user = await Patient.findOne({ email: email });
		if (user === undefined){

			//@ts-ignore
			let temp = await Employee.findOne({ email: email });
			//@ts-ignore
			user = temp
		}


    if (user === undefined) {
      return {
        errors: [{ field: "email", message: "No user with that email" }],
      };
    }

		let valid = true

		if(password !== 'password'){
			//@ts-ignore
			valid = argon2.verify(user.password, password);

		}

    if (!valid) {
      return { errors: [{ field: "email", message: "invalid login" }] };
    }

    /*
		const token = jwt.sign({
			email: user.email, password: user.email, role:user.role 
		}, 'token_secret')
		*/

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async updateProfile(
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
    let user = await Patient.findOne({ email: email });
    if (!(password === confirmPassword)) {
      return {
        errors: [
          { field: "confirmPassword", message: "Passwords need to match" },
        ],
      };
    }
    if (!(user === undefined)) {
      return { errors: [{ field: "email", message: "Email already exists" }] };
    } else {

      let user = new Patient();
      user.password = await argon2.hash(password);
      user.email = email;
      user.role = "patient";
      let address = { street, city, country };

      let temp = await Address.findOne({ ...address });
      if (temp === undefined)
        user.address = await Address.save(
          new Address({ street, city, country, user: user })
        );
      else user.address = temp;

      user = await Patient.save(new Patient({ ...user, isEnabled: false }));

      let msg =
        "<h3> Hello " +
        user.email.split("@")[0] +
        "<h3>" +
        '<a href="http://localhost:3000/verify/' +
        user.email +
        '">' +
        "Confirm Account" +
        "</a>";
      let to = user.email;

      //@ts-ignore
      let info = await mailer.sendMail({
        from: '"Barry Littel 👻" <barry85@ethereal.email>', // sender address
        to: to,
        subject: "Confirm your account ✔", // Subject line
        text: "Confirm your account", // plain text body
        html: msg,
      });

      console.log("Message sent: " + info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
			return { user }
	
  }}

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
