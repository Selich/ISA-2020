import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import { Pharmacy } from '../entities/Pharmacy';
import { MyContext } from '../types';
import { PharmacyInput } from "./types/dtos";
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

		if(!inputs.address) return null
		let temp = await Address.findOne({ 
			street: inputs.address.street,
			city: inputs.address.city,
			country: inputs.address.country,
		});
		if (temp === undefined)
			pharm.address = await Address.save(
				new Address({...inputs.address})
			);
		else pharm.address = temp;

		let inventory = new Inventory()
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

}
