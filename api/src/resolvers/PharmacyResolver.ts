import { Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../types';
import { Medicine } from '../entities/Medicine'
import { Address } from '../entities/Address'
import { PharmacyDTO, RegisterPatientDTO, UserDTO, UserResponse } from "./types/dtos";



@Resolver(Pharmacy)
export class PharmacyResolver{

  @Field(() => MedicineDetails, { nullable: true })
  details?: MedicineDetails;
}
@Resolver(Medicine)
export class MedicineResolver{
  @Query(() => [Medicine], { nullable: true })
  medicines(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
  @Query(() => [Medicine], { nullable: true })
  medicinesDetails(@Ctx() { }: MyContext) {
    return Medicine.find()
  }
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
  }
}

