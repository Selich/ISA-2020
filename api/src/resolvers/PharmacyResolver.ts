// import { Pharmacy } from '../entities/Pharmacy';
// import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
// import { MyContext } from '../types';
// import { PharmacyDTO } from './types/dtos';

// @Resolver(Pharmacy)
// export class PharmacyResolver{

  // @Query(() => [Pharmacy], { nullable: true })
  // async pharmacies() {
  //   return await Pharmacy.find({})
  // }

  // // #43
  // @Mutation(() => Pharmacy)
  // async create( @Ctx() { req, res }: MyContext) {
  // }

  // @Mutation(() => Pharmacy)
  // async subscribe(
  //   @Arg("inputs") inputs: PharmacyDTO,
  //   @Ctx() { req, res }: MyContext)
  // {
  //   const user = await User.findOneOrFail({id: req.session.userID})
  //   let pharmacy = await Pharmacy.findOneOrFail({ name: inputs.name })
  //   return await pharmacy.save()
  // }
  // @Mutation(() => Pharmacy)
  // async unsubscribe(
  //   @Arg("inputs") inputs: PharmacyDTO,
  //   @Ctx() { req, res }: MyContext)
  // {
  //   // const user = await User.findOneOrFail({id: req.session.userID})
  //   // let pharmacy = await Pharmacy.findOneOrFail({ name: inputs.name })
  //   // user.detailsuser.details.subscriptions.filter(subscription => subscription != pharmacy)
  //   // return await user.save()
  // }
// }

//
