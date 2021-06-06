import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { EPrescription } from '../entities/EPrescription';
import { Inventory } from '../entities/Inventory';
import jwt from 'jsonwebtoken'
import { Medicine } from '../entities/Medicine';
import { MedicineItem } from '../entities/MedicineItem';
import Patient from '../entities/Patient';
import { Pharmacy } from '../entities/Pharmacy';
import { Price } from '../entities/Price';
import { MyContext } from '../types';
import { MedicineInput, MedicineItemInput } from "./types/dtos";
import { Employee } from '../entities/Employee';
import { getConnection } from 'typeorm';

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
	@Mutation(() => Medicine, { nullable: true })
	async addMedicineDefinition(
		@Arg("inputs") inputs: MedicineInput,
		@Ctx() { }: MyContext
	) {
		if (!inputs.code) return null;
		let medicine = await Medicine.findOne({ code: inputs.code })
		if (medicine) return null


		medicine = new Medicine()
		if (inputs.name)
			medicine.name = inputs.name
		if (inputs.info)
			medicine.info = inputs.info
		if (inputs.kind)
			medicine.kind = inputs.kind
		if (inputs.code)
			medicine.code = inputs.code
		if (inputs.points)
			medicine.points = inputs.points
		if (inputs.form)
			medicine.form = inputs.form
		if (inputs.contents)
			medicine.contents = inputs.contents


		medicine.save()
		console.log(medicine)

		return medicine

	}

	@Mutation(() => MedicineItem, { nullable: true })
	async addMedicine(
		@Arg("inputs") inputs: MedicineItemInput,
		@Arg("token") token: string,
		@Ctx() { }: MyContext
	) {

		let temp = jwt.decode(token)
		if (!temp) return null

		// @ts-ignore
		let admin = await Employee.findOne({ email: temp.email })

		// @ts-ignore
		let medicine = await Medicine.findOne({ code: inputs.details.code })
		if (!medicine) return null


		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();








		let inventory = admin?.pharmacy.inventory
		if (!inventory) return null
		if (inputs.details) {
			let items = inventory.medicines
			//@ts-ignore
			let item = items.filter(item => item.details.code === inputs.details.code)[0]
			if (item) {
				try {
					//@ts-ignore
					item.quantity += inputs.quantity
					item.version += 1
					item.save()
					console.log(inputs.quantity)
					inventory.medicines.push(item)
					inventory.save()
					await queryRunner.manager.save(item);
					await queryRunner.manager.save(inventory);
					await queryRunner.commitTransaction();
					return item
				} catch (err) {
					await queryRunner.rollbackTransaction();
				} finally {
					await queryRunner.release();
				}
			} else {
				try {
					let medicineItem = new MedicineItem()
					medicineItem.details = medicine
					//@ts-ignore
					medicineItem.quantity = inputs.quantity
					medicineItem.version = 1

					inventory.medicines.push(medicineItem)
					await queryRunner.manager.save(inventory);
					await queryRunner.commitTransaction();

					return medicineItem
				} catch (err) {
					await queryRunner.rollbackTransaction();
				} finally {
					await queryRunner.release();
				}
			}
		}
		return null
	}

	@Mutation(() => MedicineItem, { nullable: true })
	async addPrice(
		@Arg("inputs") inputs: MedicineItemInput,
		@Arg("token") token: string,
		@Ctx() { }: MyContext
	) {

		let temp = jwt.decode(token)
		if (!temp) return null

		let item = await MedicineItem.findOne({ id: inputs.id })
		console.log(item)
		if (item && inputs.currentPrice) {
			let price = new Price()
			item.currentPrice = inputs.currentPrice
			item.version += 1
			item.save()
			price.medicine = item
			price.price = inputs.currentPrice
			price.from = new Date() + ''
			price.version = 1
			price.save()
		}
		return item
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
	async medicines(
		@Ctx() { }: MyContext
	): Promise<Medicine[]> {
		return await Medicine.find({})
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
