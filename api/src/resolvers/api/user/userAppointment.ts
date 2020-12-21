import { User } from '../../../entities/User';
import { ObjectType, InputType, Field, Mutation, Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import { MyContext } from '../../../types';
import { Appointment } from 'src/entities/Appointment';
import { AppointmentInput } from '../../types/AppointmentTypes';
import { getRepository } from 'typeorm';


@Resolver(Appointment)
export class ApiAppointmentResolver{

  @Query(() => Appointment, {nullable: true})
  getAppointmentsByPatient(
    @Arg('id', () => Int) id: number,
    @Ctx() {  }: MyContext): Promise<Appointment[] | null> {
      return getRepository(Appointment)
        .createQueryBuilder("appointment")
        .innerJoinAndSelect("appointment.patient", "patient_details")
        .innerJoinAndSelect("patient_details.user", "user")
        .where("user.id = :id", { id: id })
        .getMany()
  }

  @Mutation(() => Appointment)
  async create(
    @Arg("inputs") inputs: AppointmentInput,
    @Ctx() { }: MyContext
  ){
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

}
