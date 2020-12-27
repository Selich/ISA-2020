import { Appointment } from '../../entities/Appointment';
import { InputType, Field, ObjectType } from 'type-graphql';
import { FieldError } from './ErrorTypes';



@ObjectType()
export class AppointmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment;
}
@InputType()
export class AppointmentInput {

  @Field()
  dermId: number;

  @Field()
  pharmacyId: string;

  @Field(() => Date)
  from!: Date;

  @Field(() => Date)
  until!: Date;

}

