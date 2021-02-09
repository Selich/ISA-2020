import { Pharmacy } from '../entities/Pharmacy';
import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { Medicine } from '../entities/Medicine'

@Resolver(Pharmacy)
export class PharmacyResolver{

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies(
		@Ctx() { req, res }: MyContext
	) {
		return await Pharmacy.find({})
  }

  @Mutation(() => Pharmacy, { nullable: true })
  async pharmacy(
		@Arg('id') id: string,
		@Ctx() { req, res }: MyContext
	) {
		const ret = await Pharmacy.findOneOrFail({id: parseInt(id)})
		console.log(ret)
		return ret
  }

  @Query(() => [Pharmacy], { nullable: true })
  async containsMedicine(
    @Arg("id") id: String,
		@Ctx() { req, res }: MyContext
	) {
		const pharmacies = await Pharmacy.find({})


    return pharmacies

  }

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
}
