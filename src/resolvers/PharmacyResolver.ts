import { MedicineDetails } from '../entities/MedicineDetails';
import { Medicine } from '../entities/Medicine';
import { MedicineDetailsInput } from './types/MedicineTypes';
import { MyContext } from 'src/types';
import { ObjectType, Field, Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql';
import { Pharmacy } from 'src/entities/Pharmacy';
import { User } from 'src/entities/User';

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
  pharmacy?: Pharmacy;
}

@Resolver(Pharmacy)
export class PharmacyResolver{
  @Query(() => [Pharmacy], { nullable: true })
  medicines(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
  @Query(() => [Pharmacy], { nullable: true })
  medicinesDetails(@Ctx() { }: MyContext) {
    return Medicine.find()
  }

  @Mutation(() => [User], { nullable: true })
  async employees(
    @Arg("pharmacyId") pharmacyId: number ,
    @Arg("role") role: string,
    @Ctx() { }: MyContext): Promise<any>  {
    const users = await User.find({where: [
      {role: role},
    ]})

    const usersByPharmacy =  users.filter(
      item => item.pharmacies.filter(
        val => val.id == pharmacyId
      )
    )
    { usersByPharmacy }
  }

}
