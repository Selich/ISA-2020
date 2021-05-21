import { Field, Arg, Ctx, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import { MedicineItem } from '../entities/MedicineItem';
import { Price } from '../entities/Price';
import Patient from '../entities/Patient';
import { Pharmacy } from '../entities/Pharmacy';
import { Medicine } from '../entities/Medicine';
import { MyContext } from '../types';
import { PharmacyInput, UserInput } from "./types/dtos";
@Resolver(Pharmacy)
export class PharmacyResolver{

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies(
	) {
		return await Pharmacy.find({})
  }

  @Query(() => Pharmacy, { nullable: true })
  async pharmacy(
		@Arg('id') id: string,
	) {
		return await Pharmacy.findOneOrFail({id: parseInt(id)})
  }

  @Query(() => [Pharmacy], { nullable: true })
  async subscribedPharmacies(
		@Arg('inputs') inputs: UserInput,
	) {
		let patient  = await Patient.findOne({id: inputs.id})

		return patient.subscriptions

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

  @Query(() => [PharmacyPrice], { nullable: true })
  async containsMedicine(
    @Arg("id") id: string,
		@Ctx() { req, res }: MyContext
	) {
		let medicineId = parseInt(id)
		let pharmacies = await Pharmacy.find({})
		let medicine = await Medicine.findOneOrFail({id:medicineId})
		let price = await Price.find({
			medicine: medicine,
		})

		pharmacies = pharmacies
			.filter(item => item.inventory.medicines
				.find(item => item.details.id == medicineId))

		pharmacies = pharmacies
			.filter(item => item.inventory.medicines
				.find(item => item.quantity > 0))


		//@ts-ignore
		let pharmprice = [];
		pharmacies.forEach(item => 
			pharmprice.push(
				{
					pharmacy: item, 
					medicineItem: item.inventory.medicines
					.filter(temp => temp.details.id == medicineId)[0]
				}
			)
		)



		//@ts-ignore
		console.log(pharmprice)

		//@ts-ignore
		return pharmprice

  }

}

@ObjectType()
class PharmacyPrice {
	@Field(() => Pharmacy, { nullable: true })
  pharmacy?: Pharmacy;
  @Field(()=> MedicineItem,{ nullable: true})
	medicineItem?: MedicineItem;
}


