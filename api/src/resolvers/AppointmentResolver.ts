import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg, Int } from "type-graphql";
import { Pharmacy } from "../entities/Pharmacy";
import { Address } from "../entities/Address";
import { Rating } from "../entities/Rating";
import { AppointmentDefinition } from "../entities/AppointmentDefinition";
import { userInfo } from "os";
import { getRepository } from "typeorm";
import { AppointmentResponse } from "./types/AppointmentTypes";

@InputType()
class UserDTO {
  @Field()
  firstName: string
  @Field()
  lastName: string
}
@InputType()
class AppointmentDefinitionDTO {

  @Field()
  type: string;
  @Field()
  score: string;
  @Field()
  price: number;

}
@InputType()
class PharmDTO {
  @Field()
  id: number
  @Field()
  name: string
  @Field()
  rating: number
  @Field()
  price: AppointmentDefinitionDTO
}

@InputType()
class UserPharm {
  @Field()
  from: Date
  @Field()
  pharmacy: PharmDTO
}



@InputType()
class AppointmentRequest {
  @Field()
  from: Date
  @Field()
  until: Date
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  pharmacyName: string
}
function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

async function getAvailable(from: Date, until: Date, user: User): Promise<boolean> {
  const arr = await Appointment.find({ doctor: user })

  return arr.filter(item => ((item.from < from) && (item.until > from)) || ((item.from < until) && (item.until > until))).length == 0

}

@Resolver(Appointment)
export class AppointmentResolver {
  @Query(() => Appointment, { nullable: true })
  getAppointmentsByPatient(
    @Arg('id', () => Int) id: number,
    @Ctx() { }: MyContext): Promise<Appointment[] | null> {
    return getRepository(Appointment)
      .createQueryBuilder("appointment")
      .innerJoinAndSelect("appointment.patient", "patient_details")
      .innerJoinAndSelect("patient_details.user", "user")
      .where("user.id = :id", { id: id })
      .getMany()
  }

  @Query(() => [Appointment], { nullable: true })
  async appointments(
    @Ctx() { req }: MyContext
  ): Promise<Appointment[]> {
    const appointments = await Appointment.find({})
    if(!appointments)
      return []

    return appointments
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
  ): Promise<Pharmacy[]> {

    const pharmacists = await User.getRepository().createQueryBuilder('user')
      .innerJoinAndSelect("user.working_hours", "working_hours", "user.role = :role", { role: 'pharm' })
      .innerJoinAndSelect("user.holidays", "holiday")
      .getMany();

    const ids = pharmacists.filter(async item => getAvailable(
      from,
      addMinutes(from, (await AppointmentDefinition.findOneOrFail({ pharmacyId: item.workingHours[0].pharmacyID })).delta),
      item
    )).map(item => item.workingHours[0].pharmacyID)

    return await Pharmacy.findByIds(ids)

  }

  @Mutation(() => Appointment, { nullable: true })
  async scheduleConsultations(
    @Arg("appointment") inputs: UserPharm,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOneOrFail({ id: req.session.userId })
    if (!(req.session.role == 'patient')) {
      return null
    }
    return null


  }
  @Query(() => Appointment, { nullable: true })
  async createExamination(
    @Ctx() { req }: MyContext
  ) {
    if (!( req.session.role == 'derm')) {
      return null
    }
    return null

  }


  // pharm razlika
  // derm nema mogucnost davanja lekova pacijentu (rezervacija)
    // const errors = validateAppointment(inputs);
    // if (errors) return errors;
    //!  1. check if holiday for derm
    //!  2. check workhours
    //!   2.1  get for doc workhors from workhours table for pharmacyID
    //!   2.2  if from > workhouk.from and until < workhout.until
    //!  3. check if there exists a appointment
    //!   3.1 get all apointments for that day
    //!   3.2 for term in days_term: if from > term.from and until < term.until and patientId == null
    //!   dermID | time | ... pacientid == null
    //!   3.2.1 if collision -> err
    //!   3.2.2 if not collision -> save term
    //!  4. Save appointment to

    // const tempUser = await em.findOne(Appointment, {email: inputs.email})
}
