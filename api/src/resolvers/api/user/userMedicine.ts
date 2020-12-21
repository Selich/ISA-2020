import {Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../../../types';
import { MedicineDetails } from '../../../entities/MedicineDetails';
import { Medicine } from '../../../entities/Medicine';
import { FieldError } from '../../types/ErrorTypes';
import { PatientDetails } from '../../../entities/PatientDetails';

@ObjectType()
class MedicineResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => MedicineDetails, { nullable: true })
  details?: MedicineDetails;
}
@Resolver(Medicine)
export class MedicineResolver{
  @Mutation(() => MedicineResponse)
  async reserveMedicine(
    @Arg("inputs") inputs: Medicine,
    @Ctx() { req }: MyContext
  ): Promise<MedicineResponse> {

    const profile = await PatientDetails.getRepository()
                          .createQueryBuilder('patient_details')
                          .leftJoinAndSelect("patient_details.user", "user")
                          .where("user.id = :id", { id: req.session.userId })
                          .getOne()

    // const
    // switch(profile?.tier.name){
    //     case value:

    //       break;

    //     default:
    //       break;
    // }

    const details = new MedicineDetails();
    // details.code = inputs.code
    // details.name = inputs.name
    // details.type = inputs.type
    // details.points = inputs.points
    // details.form = inputs.form
    // details.producer = inputs.producer
    // details.info = inputs.info

    await details.save()

    return { details };
  }
}
