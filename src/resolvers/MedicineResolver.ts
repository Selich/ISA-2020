import {Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { User } from 'src/entities/User';
import { MedicineDetails } from '../entities/MedicineDetails';
import { Medicine } from '../entities/Medicine';
import { MedicineDetailsInput } from './types/MedicineTypes';

@ObjectType()
class FieldErrorMedicine {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class MedicineResponse {
  @Field(() => [FieldErrorMedicine], { nullable: true })
  errors?: FieldErrorMedicine[];

  @Field(() => MedicineDetails, { nullable: true })
  details?: MedicineDetails;
}
@Resolver(Medicine)
export class MedicineResolver{
  @Query(() => [Medicine], { nullable: true })
  medicines(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
  @Query(() => [Medicine], { nullable: true })
  medicinesDetails(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
  @Mutation(() => MedicineResponse)
  async createMedicine(
    @Arg("inputs") inputs: MedicineDetailsInput,
    @Ctx() { req }: MyContext
  ): Promise<MedicineResponse> {

    const details = new MedicineDetails();
    details.code = inputs.code
    details.name = inputs.name
    details.type = inputs.type
    details.points = inputs.points
    details.form = inputs.form
    details.producer = inputs.producer
    details.info = inputs.info

    await details.save()

    return { details };
  }
}
