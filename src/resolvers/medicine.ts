import { Medicine } from '../entities/Medicine';
import {Mutation, Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import { MyContext } from '../types';
import { MedicineInput } from './types/MedicineTypes';

@Resolver(Medicine)
export class MedicineResolver{
  @Query(() => [Medicine], { nullable: true })
  medicines(@Ctx() { req }: MyContext) {
    // you are not logged in
    return Medicine.find()

  }

}
