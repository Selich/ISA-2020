import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg, Int } from "type-graphql";
import { Pharmacy } from "../entities/Pharmacy";
import { AddressDTO, DoctorDTO } from "./types/UserTypes";
import { Rating } from "../entities/Rating";
import { AppointmentDefinition } from "../entities/AppointmentDefinition";
import { userInfo } from "os";
import { getRepository } from "typeorm";
import { AppointmentResponse } from "./types/AppointmentTypes";
import { UserConsulation, AppointmentDTO, AdminExam, PharmacyDTO } from "./types/dtos";

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

async function getAvailable(from: Date, until: Date, user: User): Promise<boolean> {
  const arr = await Appointment.find({ doctor: user })

  return arr.filter(item => ((item.from < from) && (item.until > from)) || ((item.from < until) && (item.until > until))).length == 0

}

@Resolver(Appointment)
export class AppointmentResolver {

  @Query(() => [Appointment], { nullable: true })
  async appointments(
    @Ctx() { req }: MyContext
  ): Promise<Appointment[]> {
    return await Appointment.find({})

  }
  @Query(() => Appointment, { nullable: true })
  async appointment(
    @Arg("date") date: Date,
    @Ctx() { req }: MyContext
  ) {
  }
  @Query(() => User, { nullable: true })
  async getPatientsByLoggedIn(
    @Ctx() { req }: MyContext
  ) {
    if (!(
      req.session.role == 'derm' ||
      req.session.role == 'pharm'
    )) {
      // Profile Appointment Employee
      // return new PatientDetails.find({})
    }
  }


  @Query(() => Appointment, { nullable: true })
  async getPharmByDate(
    @Arg("from") from: Date,
    @Ctx() { req }: MyContext
  ){

    const pharmacists = await User.getRepository().createQueryBuilder('user')
      .innerJoinAndSelect("user.working_hours", "working_hours", "user.role = :role", { role: 'pharm' })
      .innerJoinAndSelect("user.holidays", "holiday")
      .getMany();

    // const ids = pharmacists.filter(async item => getAvailable(
    //   from,
    //   // addMinutes(from, (await AppointmentDefinition.findOneOrFail({ pharmacy: item.workingHours[0].pharmacy })).delta),
    //   item
    // )).map(item => item.workingHours[0].pharmacyID)

    // return await Pharmacy.findByIds(ids)

  }

  @Mutation(() => Appointment, { nullable: true })
  async scheduleConsultation(
    @Arg("inputs") inputs: UserConsulation,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOneOrFail({ id: req.session.userId })
    // if (!(req.session.role == 'patient')) {
    //   return null
    // }

    return null

  }
  @Mutation(() => Appointment, { nullable: true })
  async scheduleExam(
    @Arg("inputs") inputs: AppointmentDTO,
    @Ctx() { req }: MyContext
  ): Promise<Appointment> {
    const user = await User.findOneOrFail({ id: req.session.userId })
    const appointment = await Appointment.findOneOrFail({ id: inputs.id })
    appointment.patient = user.details
    appointment.save()
    return appointment

  }
  @Mutation(() => Pharmacy, { nullable: true })
  async createPharmacy(
    @Arg("inputs") inputs: PharmacyDTO,
    @Ctx() { req }: MyContext
  ) {
    return await Pharmacy.save(new Pharmacy({...inputs}))
  }

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies() {
    return await Pharmacy.find({})
  }
  @Query(() => [Appointment], { nullable: true })
  async examinations() {
    return await Appointment.find({type: 'derm'})
  }
  @Query(() => [Appointment], { nullable: true })
  async consultations() {
    return await Appointment.find({type: 'pharm'})
  }



  @Mutation(() => Appointment, { nullable: true })
  async createExam(
    @Arg("inputs") inputs: AdminExam,
    @Ctx() { req }: MyContext
  ) {
    let {price, type, from, until ,discount } = inputs
    const doctor = await User.findOneOrFail({ email: inputs.doctor.email })
    const pharmacy = await Pharmacy.findOneOrFail({ name: inputs.pharmacy.name})
    const definition = await AppointmentDefinition.findOneOrFail({ type: 'derm' })
    price = definition.price * (1 - discount)
    const appointment = await Appointment.save(new Appointment({
      price, type, from, until, discount,
      doctor, pharmacy
    }))
    // appointment.from = inputs.from
    // appointment.until = inputs.until
    // appointment.pharmacy = (!req.session.pharmacy)
    // ? await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })
    // : req.session.pharmacy
    // appointment.score = definition.score
    // appointment.doctor = doctor
    // appointment.save()

    return appointment
  }
}
