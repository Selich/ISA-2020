import { Pharmacy } from '../entities/Pharmacy';
import { Inventory } from '../entities/Inventory'
import { PharmacyInput } from "./types/dtos"
import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { Medicine } from '../entities/Medicine'
import { Address } from '../entities/Address'


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
