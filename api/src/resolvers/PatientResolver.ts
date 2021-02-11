import Patient from "../entities/Patient";
import { Mutation, Resolver, Query, Ctx, Arg } from "type-graphql";
import argon2 from "argon2";
import {
  UserResponse,
	RatingInput,
	SubscriptionInput,
  PatientResponse,
  PatientInput,
  ComplaintInput,
} from "./types/dtos";
import { MyContext } from "../types";
import nodemailer from "nodemailer";
import { Address } from "../entities/Address";
import { Rating } from "../entities/Rating";
import { Pharmacy } from "../entities/Pharmacy";
import { Medicine } from "../entities/Medicine";
import { Complaint } from "../entities/Complaint";
import { Employee } from "../entities/Employee";
import User from "../entities/User";
import { Tier } from "../entities/Tier";
import { sendVerificationMail } from "../utils/sendMail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@Resolver(Patient)
export class PatientResolver {
  @Query(() => User, { nullable: true })
  me(@Arg("token") token: string, @Ctx() { req }: MyContext) {
    let decode = jwt.decode(token);
    console.log(decode);
    let temp = Patient.findOne({ id: req.session.id });
    if (!temp) {
      let temp2 = Employee.findOne({ id: req.session.id });
      if (!temp2) return null;
      //@ts-ignore
      temp = temp2;
    }

    return temp;
  }

  @Query(() => [Patient], { nullable: true })
  async patients(@Arg("inputs") inputs: PatientInput) {
    //@ts-ignore
    return await Patient.find({ ...inputs });
  }

  @Query(() => [Tier], { nullable: true })
  async tiers() {
    return await Tier.find({});
  }

  @Mutation(() => Patient, { nullable: true })
  async addAllergie(
    @Arg("allergies") allergies: string,
    @Ctx() { req }: MyContext
  ) {
    let temp = JSON.parse(allergies);
    let medicines = [];
    for (const item in temp) {
      //@ts-ignore
      let med = await Medicine.findOne({ name: item.value });
      if (med) medicines.push(med);
    }
    let user = await Patient.findOneOrFail({ id: req.session.userId });
    console.log(user);
    user.allergies = medicines;
    user = await Patient.save(user);
    return user;
  }
	//#3.41
  @Mutation(() => Rating, { nullable: true })
  async addRating(
    @Arg("inputs") inputs: RatingInput,
    @Ctx() { req, res }: MyContext
  ) {
    let user: Patient = req.session.user;
		let userId = 0
		if(inputs.patient) 
			//@ts-ignore
			userId = parseInt(inputs.patient.id)
		if(!user) 
				user = await Patient.findOneOrFail({id: userId})

    if (inputs.employee) {
      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
				if(!user.appointments) return null
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      } else if (employee.role === "pharm") {
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      }
      let temp = new Rating();
      temp.employee = employee;
			temp.patient = user
			if(inputs.rating) temp.rating = inputs.rating

      temp.save();
			let ratings = await Rating.find({employee: employee})
			//@ts-ignore
			let avg = ratings.reduce((a, b) => a.rating + b.rating ) / ratings.length

			employee.averageRating = avg
			employee.save()

			return temp

    } else if (inputs.pharmacy) {
      // ukoliko je jednom rezervisao lek i preuzeo lek
      // ukoliko je dobio eRecept
      //@ts-ignore
			let pharmacy = await Pharmacy.findOneOrFail({id: inputs.pharmacy.id})
			if(!user.reservations) return null
			if(!user.ePrescriptions) return null
			let res = user.reservations.find((item) => 
				(item.pharmacy.id == pharmacy.id) && (item.isBought));
      if (!res) return null;
			let etemp = user.ePrescriptions.find((item) => item.pharmacy.id == pharmacy.id);
      if (!etemp) return null;
			let temp1 = user.appointments.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp1) return null;
      let temp = new Rating();
      temp.pharmacy = pharmacy;
			temp.patient = user
			if(inputs.rating) temp.rating = inputs.rating

      temp.save();
			let ratings = await Rating.find({pharmacy: pharmacy})
			//@ts-ignore
			let avg = ratings.reduce((a, b) => a.rating + b.rating ) / ratings.length

			pharmacy.averageRating = avg
			pharmacy.save()

			return temp

    } else if (inputs.medicine) {

			let medicine = await Medicine.findOneOrFail({code: inputs.medicine.code})
      let temp = new Rating();
      temp.medicine = medicine;
			temp.patient = user
			if(inputs.rating) temp.rating = inputs.rating

      temp.save();
			let ratings = await Rating.find({medicine: medicine})
			//@ts-ignore
			let avg = ratings.reduce((a, b) => a.rating + b.rating ) / ratings.length

			medicine.rating = avg
			medicine.save()

			return temp


		}
		return null
  }
	// 3.40
  @Mutation(() => Complaint, { nullable: true })
  async addComplaint(
    @Arg("inputs") inputs: ComplaintInput,
    @Ctx() { req, res }: MyContext
  ) {
    let user: Patient = req.session.user;
		let userId = 0
		if(inputs.patient) 
			//@ts-ignore
			userId = parseInt(inputs.patient.id)
		if(!user) 
				user = await Patient.findOneOrFail({id: userId})

    if (inputs.employee) {
      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
				if(!user.appointments) return null
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      } else if (employee.role === "pharm") {
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      }
      let complaint = new Complaint();
      complaint.employee = employee;
			complaint.patient = user
      if (inputs.description) complaint.description = inputs.description;


      complaint.save();
			return complaint

    } else if (inputs.pharmacy) {
      // ukoliko je jednom rezervisao lek i preuzeo lek
      // ukoliko je dobio eRecept
      //@ts-ignore
			let pharmacy = await Pharmacy.findOneOrFail({id: inputs.pharmacy.id})
			if(!user.reservations) return null
			if(!user.ePrescriptions) return null
			let res = user.reservations.find((item) => 
				(item.pharmacy.id == pharmacy.id) && (item.isBought));
      if (!res) return null;
			let temp = user.ePrescriptions.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp) return null;
			let temp1 = user.appointments.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp1) return null;
      let complaint = new Complaint();
      complaint.pharmacy = pharmacy;
			complaint.patient = user
      if (inputs.description) complaint.description = inputs.description;
      complaint.save();

			return complaint
    }

		return null
  }
  @Mutation(() => Patient, { nullable: true })
	async unsubscribe(
		@Arg("inputs") inputs: SubscriptionInput, 
		@Ctx() { req }: MyContext) {
		let user = req.session.user
		if(!user) {
			if(inputs.patient)
				user = await Patient.findOneOrFail({email: inputs.patient.email})
		}
		if(!inputs.pharmacy?.id) return null

		let id = parseInt(inputs.pharmacy.id)
		let pharmacy = await Pharmacy.findOneOrFail({id})

		if(!pharmacy.subscribers) pharmacy.subscribers = []

		//@ts-ignore
		user.subscriptions = user.subscriptions.filter(item  => item.id !== pharmacy.id)
		user.save()
		pharmacy.subscribers = pharmacy.subscribers.filter(item  => item.id !== user.id)
		pharmacy.save()


		return user

  }

  @Mutation(() => Patient, { nullable: true })
	async subscribe(
		@Arg("inputs") inputs: SubscriptionInput, 
		@Ctx() { req }: MyContext) {
		let user = req.session.user
		if(!user) {
			if(inputs.patient)
				user = await Patient.findOneOrFail({email: inputs.patient.email})
		}
		if(!inputs.pharmacy?.id) return null

		let id = parseInt(inputs.pharmacy.id)
		let pharmacy = await Pharmacy.findOneOrFail({id})

		if(!pharmacy.subscribers) pharmacy.subscribers = []

		user.subscriptions.push(pharmacy)
		user.save()
		pharmacy.subscribers.push(user)
		pharmacy.save()


		return user

  }

  @Mutation(() => PatientResponse)
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
    @Ctx() { mailer }: MyContext
  ) {
    let user = await Patient.findOne({ email: email });
    console.log(user);

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

    user = new Patient();
    user.password = await argon2.hash(password);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;
    user.role = "patient";
    user.score = 0;
    user.penalty = 0;
    user.tier = await Tier.findOneOrFail({ id: 11 });

    let address = { street, city, country };

    let temp = await Address.findOne({ ...address });
    if (temp === undefined)
      user.address = await Address.save(
        new Address({ street, city, country, user: user })
      );
    else user.address = temp;

    user.isEnabled = true;
    user.save();

    sendVerificationMail(user.email, mailer);

    return { user };
  }
  @Mutation(() => PatientResponse)
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
  async login(@Arg("inputs") inputs: PatientInput, @Ctx() { req }: MyContext) {
    let { email, password } = inputs;

    let user = await Patient.findOne({ email: email });
    if (user === undefined) {
      let temp = await Employee.findOne({ email: email });
      if (temp === undefined) {
        return {
          errors: [{ field: "email", message: "No user with that email" }],
        };
      }
      //@ts-ignore
      user = temp;
    }

    let valid = true;

    //		if(password !== 'password'){
    //@ts-ignore
    //			valid = argon2.verify(user.password, password);

    //		}

    if (!valid) {
      return { errors: [{ field: "email", message: "invalid login" }] };
    }

    if (!user) return null;
    let token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret",
      { expiresIn: "20m" }
    );

    //@ts-ignore
    req.session.user = user;
    return { token };
  }

  @Mutation(() => PatientResponse)
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
      user.firstName = firstName;
      user.lastName = lastName;
      user.telephone = telephone;
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
      return { user };
    }
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
