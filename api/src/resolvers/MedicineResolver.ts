import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { EPrescription } from '../entities/EPrescription';
import { Inventory } from '../entities/Inventory';
import { Medicine } from '../entities/Medicine';
import { MedicineItem } from '../entities/MedicineItem';
import Patient from '../entities/Patient';
import { Pharmacy } from '../entities/Pharmacy';
import { Price } from '../entities/Price';
import { MyContext } from '../types';
import { MedicineInput, MedicineItemInput } from "./types/dtos";

@Resolver()
export class MedicineResolver {

	@Mutation(() => Medicine, { nullable: true })
	async createMedicine(
		@Arg("inputs") inputs: MedicineInput,
		@Ctx() { res }: MyContext
	) {

		let medicine = await Medicine.findOne({ code: inputs.code })

		if (medicine) return null

		medicine = new Medicine({ ...inputs })
		medicine.save()
		return medicine
	}

	@Mutation(() => Inventory, { nullable: true })
	async removeMedicine(
		@Arg("inputs") inputs: MedicineItemInput,
		@Ctx() { }: MyContext
	) {

		//@ts-ignore
		let id = parseInt(inputs.list.id)

		let inv = await Inventory.findOneOrFail({ id: id })
		if (!inputs.details) return null

		let list = inv.medicines.filter(item =>
			//@ts-ignore
			(item.details.code === inputs.details.code) &&
			(item.reservation)
		)
		if (list.length == 0 || !list) {
			//@ts-ignore
			let i = parseInt(inputs.id)
			let item = await MedicineItem.findOneOrFail({ id: i })
			inv.medicines.splice(inv.medicines.indexOf(item))
			inv.save()
			await MedicineItem.remove(item)
		}
		return inv


	}
	@Mutation(() => Inventory, { nullable: true })
	async addMedicine(
		@Arg("inputs") inputs: MedicineItemInput,
		@Ctx() { }: MyContext
	) {

		if (!inputs.details) return null;
		let medicine = await Medicine.findOneOrFail({ code: inputs.details.code })
		if (!medicine) return null
		//@ts-ignore
		if (!inputs.list.id) return null
		//@ts-ignore
		let id = parseInt(inputs.list.id)
		let inventory = await Inventory.findOneOrFail({ id })
		//@ts-ignore
		let res = inventory.medicines.filter(item => item.details.code === inputs.details.code)
		if (!res) {
			let medicineItem = new MedicineItem()
			medicineItem.details.prices = []
			if (inputs.quantity)
				medicineItem.quantity = inputs.quantity
			if (inputs.currentPrice) {
				medicineItem.details.prices.push(new Price({
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
			if (!inventory.medicines) {
				//@ts-ignore
				inventory.medicines = arr
			}

			return inventory

		}
		//@ts-ignore
		let im = res[0]
		if (inputs.quantity)
			im.quantity += inputs.quantity
		im.save()
		return inventory

	}

	@Mutation(() => [EPrescription], { nullable: true })
	async eprescriptions(
		@Arg("email") email: string,
		@Ctx() { res }: MyContext
	) {
		let user = await Patient.findOneOrFail({ email: email })
		return await EPrescription.find({ patient: user })
	}

	@Query(() => [Medicine], { nullable: true })
	async shop(
		@Ctx() { }: MyContext
	): Promise<Medicine[]> {
		return await Medicine.find({})
	}

	@Query(() => [Medicine], { nullable: true })
	async getReport(
		@Arg('inputs') inputs: MedicineItemInput,
		@Ctx() { req, res }: MyContext
	) {
		return []
		// let user = req.session.user

		// let name = inputs.details
		// let id = parseInt(inputs.list.id)
		// let date = inputs.dateOfPurchase
		// let list = []
		// let items = []

		// // sve rezervacije gde je apoteka ta i ta
		// let pharm = await Pharmacy.findOneOrFail({ id: user.pharmacy.id })
		// // sve lekove
		// let breserv = pharm.reservations.filter(item => item.isBought)
		// // sve recepte gde je apoteka ta i ta
		// let bprescription = pharm.prescritions.filter(item => item.isUsed)
		// // sve lekove


	}

	@Query(() => [Pharmacy], { nullable: true })
	async pharmacyMedicine(
		@Arg('inputs') inputs: MedicineInput
	): Promise<Pharmacy[]> {
		let pharmacies = await Pharmacy.find({})
		console.log(pharmacies[0].inventory.medicines)
		//@ts-ignore
		let list = pharmacies.filter(
			pharmacy => (pharmacy.inventory.medicines.filter(
				item => item.details.code == inputs.code
			) !== null) || pharmacy.inventory.medicines === undefined)

		return list

	}
}
