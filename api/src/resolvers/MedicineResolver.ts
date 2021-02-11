import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { getRepository, IsNull } from 'typeorm';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import  Patient from '../entities/Patient';
import { Medicine } from '../entities/Medicine';
import { MedicineItem } from '../entities/MedicineItem';
import { Pharmacy } from '../entities/Pharmacy';
import { EPrescription } from '../entities/EPrescription';
import { MedicineInput, MedicineItemInput } from "./types/dtos";

@Resolver()
export class MedicineResolver {

		@Mutation(() => Medicine, { nullable: true })
		async createMedicine(
			@Arg("inputs") inputs: MedicineInput,
			@Ctx() { res }: MyContext
		) {

			let medicine = await Medicine.findOne({code: inputs.code})

			if(medicine) return null

			medicine = new Medicine({ ...inputs })
			medicine.save()
			return medicine
		}

		@Mutation(() => MedicineItem, { nullable: true })
		async addMedicine(
			@Arg("inputs") inputs: MedicineItemInput,
			@Ctx() { res }: MyContext
		) {

			if(!inputs.details) return null;
			let medicine = await Medicine.findOneOrFail({code: inputs.details.code})
			if(!medicine) return null

			
				//
			let medicineItem = new MedicineItem()


			if(inputs.quantity)
				medicineItem.quantity = inputs.quantity
			if(inputs.price)
				medicineItem.price = inputs.price
			medicineItem.details = medicine
			if(!inputs.list.id) return null



			let id = parseInt(inputs.list.id)
			let inventory = await Inventory.findOneOrFail({ id })
			console.log(inventory)
			medicineItem.list = inventory 
			medicineItem.save()
			let medicines: MedicineItem[] = []
			if(inventory.medicines) medicines = inventory.medicines
			medicines.push(medicineItem)
			inventory.medicines = medicines

			inventory.save()

			return medicineItem
		}

		@Mutation(() => [EPrescription], { nullable: true })
		async eprescriptions(
			@Arg("email") email: string,
			@Ctx() { res }: MyContext
		) {
			let user = await Patient.findOneOrFail({email: email})
			return await EPrescription.find({patient: user})
		}

    @Query(() => [Medicine], { nullable: true })
    async shop(
        @Ctx() { }: MyContext
    ): Promise<Medicine[]>{
        return await Medicine.find({})
    }

    @Query(() => [Pharmacy], { nullable: true })
    async pharmacyMedicine(
        @Arg('inputs') inputs : MedicineInput
    ): Promise<Pharmacy[]>{
				let pharmacies = await Pharmacy.find({})
			 console.log(pharmacies[0].inventory.medicines)
				//@ts-ignore
			  let list = pharmacies.filter(
					pharmacy => ( pharmacy.inventory.medicines.filter(
						item => item.details.code == inputs.code
					) !== null) || pharmacy.inventory.medicines === undefined )

        return list
			
		}
}
