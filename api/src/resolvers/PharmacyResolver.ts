import { Pharmacy } from '../entities/Pharmacy';
import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { Medicine } from '../entities/Medicine'
import { Address } from '../entities/Address'
<<<<<<< HEAD
import { PharmacyDTO, RegisterPatientDTO, UserDTO, UserResponse } from "./types/dtos";



@Resolver(Pharmacy)
export class PharmacyResolver{
=======
import { Inventory } from '../entities/Inventory'
import { PharmacyInput } from "./types/dtos"
>>>>>>> dev


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
<<<<<<< HEAD
  @Mutation(() => MedicineResponse)
  async createMedicine(
    @Arg("inputs") inputs: MedicineDetailsInput,
    @Ctx() { req }: MyContext
  ): Promise<MedicineResponse> {

  @Mutation(() => Pharmacy, { nullable: true })
  async createPharmacy(
		@Arg('inputs') inputs: PharmacyDTO,
		@Ctx() { req, res }: MyContext
	) {
		let pharm = new Pharmacy()
		let { name, street, city, country } = inputs
		let address = { street, city, country }
		pharm.name = inputs.name

		let temp = await Address.findOne({ ...address });
		if (temp === undefined)
			pharm.address = await Address.save(
				new Address({ street, city, country,  pharm: pharm })
			);
		else pharm.address = temp;

		let newPharm = Pharmacy.save(pharm)

		return { newPharm }

  }

  @Query(() => [Pharmacy], { nullable: true })
  async containsMedicine(
    @Arg("id") id: String,
		@Ctx() { req, res }: MyContext
	) {
		const pharmacies = await Pharmacy.find({})

    await details.save()

    return { details };
=======

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

>>>>>>> dev
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
