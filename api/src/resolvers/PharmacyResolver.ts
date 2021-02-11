import { Pharmacy } from '../entities/Pharmacy';
import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { Medicine } from '../entities/Medicine'
import { Address } from '../entities/Address'
import { Inventory } from '../entities/Inventory'
import { PharmacyInput } from "./types/dtos"


@Resolver(Pharmacy)
export class PharmacyResolver{

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies(
	) {
		return await Pharmacy.find({})
  }

  @Mutation(() => Pharmacy, { nullable: true })
  async pharmacy(
		@Arg('id') id: string,
	) {
		return await Pharmacy.findOneOrFail({id: parseInt(id)})
  }

  @Mutation(() => Pharmacy, { nullable: true })
  async createPharmacy(
		@Arg('inputs') inputs: PharmacyInput,
	) {
		let pharm = new Pharmacy({...inputs})

		let temp = await Address.findOne({ ...inputs.address });
		if (temp === undefined)
			pharm.address = await Address.save(
				new Address({...inputs.address})
			);
		else pharm.address = temp;

		let inventory = new Inventory()
		inventory.pharmacy = pharm
		inventory.medicines = []
		inventory.save()

		pharm.inventory = inventory
		
		pharm.save()


		return pharm 

  }
  @Mutation(() => Pharmacy, { nullable: true })
  async removePharmacy(
		@Arg('inputs') inputs: PharmacyInput,
	) {
		if(!inputs.id) return null
		let id = parseInt(inputs.id)
		return await Pharmacy.delete({id})

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
