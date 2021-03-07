import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Complaint } from "../entities/Complaint";
import { Employee } from "../entities/Employee";
import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import { Pharmacy } from "../entities/Pharmacy";
import { Rating } from "../entities/Rating";
import { Tier } from "../entities/Tier";
import User from "../entities/User";
import { MyContext } from "../types";
import {
  ComplaintInput, RatingInput,
  SubscriptionInput
} from "./types/dtos";

@Resolver(Patient)
export class PatientResolver {

  @Query(() => Patient, { nullable: true })
  async patient( @Arg("token") token: string) {
    console.log(token)
    let temp = jwt.decode(token)
    //@ts-ignore
    let patient = await Patient.findOne({ email: temp.email });
    console.log(patient)
    return patient
  }

  @Query(() => [Patient], { nullable: true })
  async patients(
  ) {
    //@ts-ignore
    return await Patient.find({});
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
    if (inputs.patient)
      //@ts-ignore
      userId = parseInt(inputs.patient.id)
    if (!user)
      user = await Patient.findOneOrFail({ id: userId })

    if (inputs.employee) {

      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
        if (!user.appointments) return null
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      } else if (employee.role === "pharm") {
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      }
      let temp = new Rating();
      temp.employee = employee;
      temp.patient = user
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ employee: employee })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

      employee.averageRating = avg
      employee.save()

      return temp

    } else if (inputs.pharmacy) {
      // ukoliko je jednom rezervisao lek i preuzeo lek
      // ukoliko je dobio eRecept
      //@ts-ignore
      let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })
      if (!user.reservations) return null
      if (!user.ePrescriptions) return null
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
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ pharmacy: pharmacy })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

      pharmacy.averageRating = avg
      pharmacy.save()

      return temp

    } else if (inputs.medicine) {

      let medicine = await Medicine.findOneOrFail({ code: inputs.medicine.code })
      let temp = new Rating();
      temp.medicine = medicine;
      temp.patient = user
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ medicine: medicine })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

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
    if (inputs.patient)
      //@ts-ignore
      userId = parseInt(inputs.patient.id)
    if (!user)
      user = await Patient.findOneOrFail({ id: userId })

    if (inputs.employee) {
      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
        if (!user.appointments) return null
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
      let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })
      if (!user.reservations) return null
      if (!user.ePrescriptions) return null
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
    if (!user) {
      if (inputs.patient)
        user = await Patient.findOneOrFail({ email: inputs.patient.email })
    }
    if (!inputs.pharmacy?.id) return null

    let id = parseInt(inputs.pharmacy.id)
    let pharmacy = await Pharmacy.findOneOrFail({ id })

    if (!pharmacy.subscribers) pharmacy.subscribers = []

    //@ts-ignore
    user.subscriptions = user.subscriptions.filter(item => item.id !== pharmacy.id)
    user.save()
    pharmacy.subscribers = pharmacy.subscribers.filter(item => item.id !== user.id)
    pharmacy.save()


    return user

  }

  @Mutation(() => Patient, { nullable: true })
  async subscribe(
    @Arg("inputs") inputs: SubscriptionInput,
    @Ctx() { req }: MyContext) {
    let user = req.session.user
    if (!user) {
      if (inputs.patient)
        user = await Patient.findOneOrFail({ email: inputs.patient.email })
    }
    if (!inputs.pharmacy?.id) return null

    let id = parseInt(inputs.pharmacy.id)
    let pharmacy = await Pharmacy.findOneOrFail({ id })

    if (!pharmacy.subscribers) pharmacy.subscribers = []

    user.subscriptions.push(pharmacy)
    user.save()
    pharmacy.subscribers.push(user)
    pharmacy.save()


    return user

  }

}
