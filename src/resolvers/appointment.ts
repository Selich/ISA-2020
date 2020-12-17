import { User } from '../entities/User';
import { ObjectType, InputType, Field, Mutation, Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import { MyContext } from '../types';
import { Appointment } from 'src/entities/Appointment';
import { AppointmentInput } from './types/AppointmentTypes';

@ObjectType()
class UserResponse {
  @Field(() => [Error], {nullable: true})
  errors?: Error[]
  @Field(() => User, { nullable: true})
  user?: User
}

@Resolver()
export class AppointmentResolver{
  @Query(() => [Appointment])
  appointments(
    @Ctx() { em }: MyContext): Promise<Appointment[]> {
    return em.find(Appointment, {})
  }

  @Query(() => Appointment, {nullable: true})
  appointment(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext): Promise<Appointment | null> {
    return em.findOne(Appointment, {id})
  }

  @Mutation(() => Appointment)
  async create(
    @Arg("inputs") inputs: AppointmentInput,
    @Ctx() { em }: MyContext
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
