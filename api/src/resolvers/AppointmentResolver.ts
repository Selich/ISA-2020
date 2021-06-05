import { Appointment } from "../entities/Appointment";
import { AppointmentDefinition } from "../entities/AppointmentDefinition";
import jwt from "jsonwebtoken";
import { IsNull, MoreThanOrEqual, Not } from 'typeorm'
import moment from 'moment'
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { GraphQLDateTime } from 'graphql-iso-date'
import { sendAppointmentMail } from "../utils/sendMail";
import { Pharmacy } from "../entities/Pharmacy";
import { Employee } from "../entities/Employee";
import { WorkingHours } from "../entities/WorkingHours";
import User from '../entities/User';
import Patient from "../entities/Patient";
import { UserInput, AppointmentInput, EmployeeInput } from "./types/dtos";
import { isNonNullType } from "graphql";


function addMinutes(date: Date, minutes: number) {
	return new Date(date.getTime() + minutes * 60000);
}

function convertToDate(arr: WorkingHours | Appointment[]): Date[] {

	let ret: Date[] = []
	//@ts-ignore
	arr.forEach(item => ret.push(new Date(item.begin)))

	return ret
}

@Resolver(Appointment)
export class AppointmentResolver {

	@Query(() => [Appointment], { nullable: true })
	async appointmentsByUser(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
	): Promise<any> {

		const temp = jwt.decode(token)
		if (!temp) return null

		//@ts-ignore
		let user = await User.findOne({ email: temp.email });

		let appointments = null
		if (inputs.isVisited !== null) {
			appointments = await Appointment.find({
				where: {
					patient: user,
					isVisited: inputs.isVisited
				}
			})
		} else {
			appointments = await Appointment.find({
				where: {
					patient: IsNull(),
				}
			})
		}

		return appointments
		/**
			if(inputs.begin){
				let dateFrom = Date.parse(inputs.begin)
				appointments = appointments?.filter(item => Date.parse(item.begin) >= dateFrom)
			}
		**/
	}

	@Query(() => [Appointment], { nullable: true })
	async appointmentsPatient(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
		@Arg("type") type: string,
	): Promise<any> {
		if(!token) return []
		console.log(token)
		const temp = jwt.decode(token)
		if(!temp) return []
		console.log(temp)
		// @ts-ignore
		let user =  await Patient.findOneOrFail({email: temp.email})
		let app =  await Appointment.find({
			where: {
				kind: inputs.kind,
				patient: user,
				isVisited: (type === 'history')
			}
		})
		console.log(user)

		return app
	}

	@Mutation(() => Appointment, { nullable: true })
	async notArrived(
		@Arg("inputs") inputs: AppointmentInput,
	) {
		let appointment = await Appointment.findOneOrFail({ id: inputs.id })
		let patient = appointment.patient

		patient.penalty += 1
		patient.save()
		appointment.remove()


	}

	@Mutation(() => Appointment, { nullable: true })
	async unschedulePatient(
		@Arg("inputs") inputs: AppointmentInput,
		@Arg("token") token: string,
	) {
		if (!inputs.id) return null
		let appointment = await Appointment.findOneOrFail({ id: inputs.id })

		if (!inputs.begin) return null
		if((new Date(inputs.begin)).getTime() - new Date().getTime() <= 24*60*60*1000){
			return null
		}
		//@ts-ignore
		appointment.patient = null
		appointment.save()

		return appointment
	}


	@Query(() => [Appointment], { nullable: true })
	async appointments(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
	): Promise<Appointment[]> {
		if (!inputs) return await Appointment.find({})

		if(token && !inputs.employee) {
			const temp = jwt.decode(token)
			// @ts-ignore
			let user =  await Employee.findOneOrFail({email: temp.email})
			let appointments =  await Appointment.find({employee: user})
			return appointments
		}

		return await Appointment.find({
			relations: ["patient", "employee", "pharmacy"],
			where: {
				kind: (inputs.kind) ? inputs.kind : Not(IsNull()),
				employee: (inputs.employee) ? inputs.employee : Not(IsNull()),
				patient: (inputs.patient) ? inputs.patient : Not(IsNull()),
				pharmacy: (inputs.pharmacy) ? inputs.pharmacy : Not(IsNull()),
				isVisited: (inputs.isVisited) ? inputs.isVisited : Not(IsNull()),
			}
		}
		)
	}




	@Query(() => [Appointment], { nullable: true })
	async freeAppointments(
		@Arg("pharmacyId") pharmacyId: string,
		@Arg("token") token: string,
		@Arg("kind") kind: string,
	): Promise<Appointment[]> {
		if(kind === 'derm'){
			let id = parseInt(pharmacyId)
			let pharmacy = await Pharmacy.findOneOrFail({ id: id })
			let app = await Appointment.find({ pharmacy: pharmacy, patient: IsNull(), kind: 'derm' })
			return app
		} else if (kind === 'pharm'){
			const temp = jwt.decode(token)
			if (!temp) return []
			// @ts-ignore
			let employee = await Employee.findOneOrFail({ email: temp?.email })
			let app = await Appointment.find({ pharmacy: employee.pharmacy, patient: IsNull() })
			return app
		}
		return []
	}

	@Query(() => [AppointmentDefinition], { nullable: true })
	async definitions(
		@Ctx() { req }: MyContext
	): Promise<AppointmentDefinition[]> {
		return await AppointmentDefinition.find({})
	}

	@Mutation(() => AppointmentDefinition, { nullable: true })
	async createDefinition(
		@Arg("inputs") inputs: AppointmentInput,
		@Ctx() { req }: MyContext
	): Promise<AppointmentDefinition> {
		let definition = await AppointmentDefinition.findOneOrFail({ kind: inputs.kind })
		if (!definition) {
			definition = new AppointmentDefinition()
		}
		if (inputs.kind)
			definition.kind = inputs.kind
		if (inputs.price)
			definition.price = inputs.price
		if (inputs.score)
			definition.score = inputs.score
		definition.save()
		return definition
	}

	@Query(() => [Appointment], { nullable: true })
	async available(
		@Arg("id") id: string,
		@Ctx() { req }: MyContext
	): Promise<Appointment[]> {
		let numId = parseInt(id)
		let temp = await Pharmacy.findOne({ id: numId })
		if (!temp) return [];
		return await Appointment.find({
			kind: 'derm',
			patient: IsNull(),
			pharmacy: temp
		})
	}

	@Query(() => Appointment, { nullable: true })
	async appointment(
		@Arg("date") date: string,
		@Ctx() { req }: MyContext
	) {
	}

	@Mutation(() => Appointment, { nullable: true })
	async unschedule(
		@Arg("inputs") inputs: AppointmentInput,
	) {

		if (!inputs.id) return null
		let id = parseInt(inputs.id)
		let appointment = await Appointment.findOneOrFail({ id: id })
		//@ts-ignore
		

		appointment.remove()
		return appointment



		return appointment
	}

	@Mutation(() => Appointment, { nullable: true })
	async scheduleAppointmentEmployee(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
		@Ctx() { mailer }: MyContext
	) {
		const temp = jwt.decode(token)
		if (!temp) return null
		// @ts-ignore
		let employee = await Employee.findOneOrFail({ email: temp?.email })

		if(!inputs.patient) return null
		let patient = await Patient.findOneOrFail({email : inputs.patient.email})
		let pharmacy = null
		if(inputs.kind === 'derm'){
			if(!inputs.pharmacy) return null
			pharmacy = await Pharmacy.findOneOrFail({id : inputs.pharmacy.id})
		} else  if(inputs.kind === 'pharm'){
			pharmacy = employee.pharmacy
		}
		let defitinion = await AppointmentDefinition.findOneOrFail(
			{
				where:{
				pharmacy : pharmacy,
				kind: inputs.kind
				}
			}
		)
		let app = new Appointment()
		if(!inputs.begin) return null
		app.begin = inputs.begin
		app.price = defitinion.price
		app.employee = employee
		app.length = 30
		if(pharmacy)
			app.pharmacy = pharmacy
		app.patient = patient
		app.isVisited = false
		if(!inputs.kind) return null
		app.kind = inputs.kind
		app.save()

		if(!employee.schedule){
			employee.schedule = []

		}
		employee.schedule.push(app)
		employee.save()

		sendAppointmentMail(patient, app, mailer).then(
			res => console.log(res)
		)

		return app
	}

	
	@Mutation(() => Appointment, { nullable: true })
	async scheduleConsultation(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
		@Ctx() { mailer }: MyContext
	) {
		const temp = jwt.decode(token)
		if (!temp) return null
		// @ts-ignore
		let patient = await Patient.findOneOrFail({ email: temp?.email })
		if(!inputs.employee) return null
		if(!inputs.pharmacy) return null

		let employee = await Employee.findOneOrFail({email : inputs.employee.email})
		let pharmacy = await Pharmacy.findOneOrFail({id : inputs.pharmacy.id})

		let app = new Appointment()
		if(!inputs.begin) return null
		app.begin = inputs.begin
		if(!inputs.price) return null
		app.price = inputs.price
		app.employee = employee
		app.pharmacy = pharmacy
		app.isVisited = false
		if(inputs.kind)
			app.kind = inputs.kind
		app.patient = patient
		app.save()
		if(!patient.appointments){
			patient.appointments = []

		}
		patient.appointments.push(app)
		patient.save()

		return app
	}



	@Mutation(() => Appointment, { nullable: true })
	async schedule(
		@Arg("token") token: string,
		@Arg("inputs") inputs: AppointmentInput,
		@Ctx() { mailer }: MyContext
	) {

		const temp = jwt.decode(token)
		if (!temp) return null

		if (!inputs.id) return null

		let id = parseInt(inputs.id)
		let appointment = await Appointment.findOneOrFail({ id: id })
		//@ts-ignore
		let patient = await Patient.findOneOrFail({ email: temp?.email })
		appointment.patient = patient
		appointment.save()
		sendAppointmentMail(patient, appointment, mailer).then(
			res => console.log(res)
		)
		//@ts-ignore
		//let definitions = await AppointmentDefinition.findOneOrFail({ kind: inputs.kind })

		return appointment


	}


	@Mutation(() => Appointment, { nullable: true })
	async addFreeApp(
		@Arg("from") from: string,
		@Arg("length") length: number,
		@Arg("discount") discount: number,
		@Arg("token") token: string,
		@Arg("employee") employee: EmployeeInput,
		@Ctx() { req, res }: MyContext
	) {

		let temp = jwt.decode(token)
		if (!temp) return null

		// @ts-ignore
		let admin = await Employee.findOneOrFail({ email: temp.email })

		let app = new Appointment()
		app.begin = new Date(from)
		app.length = length
		app.employee = await Employee.findOneOrFail({ email: employee.email })
		app.pharmacy = admin.pharmacy
		app.save()
		return app

	}

}
