import { Field, Arg, Ctx, Mutation, ObjectType, Query, Resolver, InputType } from 'type-graphql';
import { Address } from '../entities/Address';
import jwt from 'jsonwebtoken'
import { Inventory } from '../entities/Inventory';
import { MedicineItem } from '../entities/MedicineItem';
import { Price } from '../entities/Price';
import Patient from '../entities/Patient';
import { Pharmacy } from '../entities/Pharmacy';
import { Medicine } from '../entities/Medicine';
import { MyContext } from '../types';
import { PharmacyInput, UserInput } from "./types/dtos";
import { Employee } from '../entities/Employee';
import { Appointment } from '../entities/Appointment';
import { WorkingHours } from 'src/entities/WorkingHours';

@InputType()
class DateInput {
  @Field(() => String, { nullable: true })
	date?: String;
  @Field(() => String, { nullable: true })
	hours?: string;
  @Field(() => String, { nullable: true })
	minutes?: string;

}
@Resolver(Pharmacy)
export class PharmacyResolver{

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies(
	) {
		return await Pharmacy.find({})
  }

  @Query(() => Pharmacy, { nullable: true })
  async pharmacy(
		@Arg('inputs') inputs: PharmacyInput,
	) {
		return await Pharmacy.findOneOrFail({id: inputs.id})
  }

  @Query(() => [Employee], { nullable: true })
  async freePharms(
		@Arg('inputs') inputs: DateInput,
	) {

		// @ts-ignore
		let date = new Date(inputs.date)
		date.setTime(date.getTime() + (2*60*60*1000))
		if(inputs.hours)
			date.setTime(date.getTime() + (parseInt(inputs.hours)*60*60*1000))
		if(inputs.minutes)
			date.setTime(date.getTime() + (parseInt(inputs.minutes)*60*1000))


			console.log(inputs)

		let pharm = await Pharmacy.find({})
		let allEmpl = await Employee.find({role: 'pharm'})
		let app = await Appointment.find({kind: 'pharm'})

		app = app.filter(item => {
			let end = new Date(item.begin.getTime() + item.length*60000)
			return item.begin <= date && end >= date
		})
		let empl = app.map(item => item.employee)

		allEmpl = allEmpl.filter(
			item => !empl.find(temp => temp.id == item.id)
		)

		let appo = allEmpl.map(item => item.schedule)


		// @ts-ignore
		let temp = []
		allEmpl.forEach(
			item => {
				if(item.workingHours && item.workingHours[0]){
					let fromWh = item.workingHours[0].from
					let untilWh = item.workingHours[0].until
					let time = date.toLocaleTimeString('it-IT')
					if (fromWh <= time && untilWh >= time){
						temp.push(item)
					}
				}
			}
		)

		// @ts-ignore
		console.log(temp)

		// @ts-ignore
		return temp

	}




  @Query(() => [MedicineItem], { nullable: true })
  async inventory(
		@Arg('token') token: string,
	) {
		let temp = jwt.decode(token)
		if(!temp) return null
		// @ts-ignore
		let admin  = await Employee.findOne({email: temp.email})

		return admin?.pharmacy.inventory.medicines

  }




  @Query(() => [Pharmacy], { nullable: true })
  async subscribedPharmacies(
		@Arg('inputs') inputs: UserInput,
	) {
		let patient  = await Patient.findOne({id: inputs.id})

		if(!patient) return null
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


