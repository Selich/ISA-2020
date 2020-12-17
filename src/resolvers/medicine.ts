import { Medicine } from '../entities/Medicine';
import {Mutation, Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import { MyContext } from '../types';

@Resolver()
export class MedicineResolver{
  @Query(() => [Medicine])
  users(
    @Ctx() { em }: MyContext): Promise<Medicine[]> {
    return em.find(Medicine, {})
  }

  @Query(() => Medicine, {nullable: true})
  user(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext): Promise<Medicine | null> {
    return em.findOne(Medicine, {id})
  }


}
