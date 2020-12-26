import { Pharmacy } from '../entities/Pharmacy';
import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';

@Resolver(Pharmacy)
export class PharmacyResolver{
  // #43
  @Query(() => Pharmacy, { nullable: true })
  async holiday( @Ctx() { req }: MyContext) {
  }

  // #43
  @Mutation(() => Pharmacy)
  async create( @Ctx() { req, res }: MyContext) {
  }
}

