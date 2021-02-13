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
import { Reservation } from '../entities/Reservation';
import { Price } from '../entities/Price';
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

		@Mutation(() => Inventory, { nullable: true })
		async removeMedicine(
			@Arg("inputs") inputs: MedicineItemInput,
			@Ctx() {  }: MyContext
		) {

			//@ts-ignore
		  let id = parseInt(inputs.list.id)

			let inv = await Inventory.findOneOrFail({id: id})
			if(!inputs.details) return null

			let list = inv.medicines.filter(item => 
				//@ts-ignore
				(item.details.code === inputs.details.code) &&
				(item.reservation)
			)
			if(list.length == 0 || !list){
				//@ts-ignore
				let i = parseInt(inputs.id)
				let item = await MedicineItem.findOneOrFail({id: i})
				inv.medicines.splice(inv.medicines.indexOf(item))
				inv.save()
				await MedicineItem.remove(item)
			}
			return inv

			
		}
		@Mutation(() => Inventory, { nullable: true })
		async addMedicine(
			@Arg("inputs") inputs: MedicineItemInput,
			@Ctx() {  }: MyContext
		) {

			if(!inputs.details) return null;
			let medicine = await Medicine.findOneOrFail({code: inputs.details.code})
			if(!medicine) return null
			//@ts-ignore
			if(!inputs.list.id) return null
			//@ts-ignore
			let id = parseInt(inputs.list.id)
			let inventory = await Inventory.findOneOrFail({ id })
			//@ts-ignore
			let res = inventory.medicines.filter(item => item.details.code === inputs.details.code)
			if(!res){
				let medicineItem = new MedicineItem()
				medicineItem.prices = []
				if(inputs.quantity)
					medicineItem.quantity = inputs.quantity
				if(inputs.currentPrice){
					medicineItem.prices.push(new Price({
						price: inputs.currentPrice,
						medicineItem: medicineItem,
						from: new Date()
					}))
					medicineItem.currentPrice = inputs.currentPrice

				}
				medicineItem.details = medicine
				console.log(inventory)
				medicineItem.list = inventory
				let item = medicineItem.save()
				inventory.medicines.push(medicineItem)
				inventory.save()
				//@ts-ignore
				let arr = []
				if(!inventory.medicines) {
					//@ts-ignore
					inventory.medicines = arr
				}

				return inventory

			}
				//@ts-ignore
			let im = res[0]
			if(inputs.quantity)
				im.quantity += inputs.quantity
			im.save()
			return inventory

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
