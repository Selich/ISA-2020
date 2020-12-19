import { Medicine } from '../entities/Medicine';
import {Resolver, Query, Ctx} from 'type-graphql';
import { MyContext } from '../types';

@Resolver(Medicine)
export class MedicineResolver{
  @Query(() => [Medicine], { nullable: true })
  medicines(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
}
