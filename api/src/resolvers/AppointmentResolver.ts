import { Appointment } from "../entities/Appointment";
import { AppointmentDefinition } from "../entities/AppointmentDefinition";
import jwt from "jsonwebtoken";
import { IsNull } from 'typeorm'
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
import { UserInput, AppointmentInput } from "./types/dtos";


function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

function convertToDate(arr:  WorkingHours | Appointment[]): Date[]{

	let ret : Date[]= []
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
				if(!temp) return null

				//@ts-ignore
				let user = await User.findOne({ email: temp.email });


				let appointments = null
				if(inputs.isVisited !== null){
					appointments = await Appointment.find({where: { 
						patient: user, 
						isVisited: inputs.isVisited
					}})
				} else {
					appointments = await Appointment.find({where: { 
						patient: IsNull(), 
					}})
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
    async freeAppointments(
        @Arg("pharmacyId") pharmacyId: string,
    ): Promise<Appointment[]> {
				let id = parseInt(pharmacyId)
			let pharmacy = await Pharmacy.findOneOrFail({id:id})
			console.log(pharmacy)
			let app =  await Appointment.find({ pharmacy: pharmacy, patient: IsNull() })
			return app
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
		  let definition = await AppointmentDefinition.findOneOrFail({kind: inputs.kind})
			if(!definition){
				definition = new AppointmentDefinition()
			}
			if(inputs.kind)
				definition.kind = inputs.kind
			if(inputs.price)
				definition.price = inputs.price
			if(inputs.score)
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
			let temp = await Pharmacy.findOne({ id: numId} )
			if(!temp) return [];
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

			console.log(inputs)
			if(!inputs.id) return null
			let id = parseInt(inputs.id)
			let appointment = await Appointment.findOneOrFail({id: id })
			//@ts-ignore
			appointment.patient = null

			appointment.save()



			return appointment
		}

    @Mutation(() => Appointment, { nullable: true })
    async schedule(
        @Arg("token") token: string,
        @Arg("inputs") inputs: AppointmentInput,
        @Ctx() { mailer }: MyContext
    ) {

			const temp = jwt.decode(token)
			if(!temp) return null
			
			if(!inputs.id) return null

			let id = parseInt(inputs.id)
			let appointment = await Appointment.findOneOrFail({id: id })
			//@ts-ignore
			let patient = await Patient.findOneOrFail({email: temp?.email})
			appointment.patient = patient
			appointment.save()
			sendAppointmentMail(patient, appointment, mailer).then(
				res => console.log(res)
			)
			//@ts-ignore
			//let definitions = await AppointmentDefinition.findOneOrFail({ kind: inputs.kind })

			return appointment


			/**
			//Check if free
			let employeeWH = employee.workingHours.filter(item => item.pharmacy.id === pharmacy.id)[0]

			if(!inputs.begin || !inputs.length) return null
			let begin = new Date(inputs.begin)
			let hours = Math.floor(inputs.length / 60);  
			let minutes = inputs.length % 60;
			let end = begin
			end.setHours(hours)
			end.setMinutes(minutes)

			let fromDate = new Date();
			let untilDate = new Date();

			fromDate.setHours(parseInt(employeeWH.from.split(':')[0]))
			untilDate.setMinutes(parseInt(employeeWH.from.split(':')[1]))

			if(begin <= fromDate || end >= untilDate) return null

			let app = new Appointment()
			app.employee = employee
			if(!inputs.discount)  inputs.discount = 0;
			app.price = definitions.price * ( 1 - inputs.discount )
			app.pharmacy = pharmacy
			app.patient = patient
			if(!inputs.begin) return;
				app.begin = '' + begin
			if(!inputs.length) return;
				app.length = inputs.length

			app.save()
			return app
			**/

    }

    @Mutation(() => Appointment, { nullable: true })
    async addFreeApp(
        @Arg("from") from: string,
        @Arg("length") length: number,
        @Arg("discount") discount: number,
        @Arg("employee") employee: string,
        @Ctx() { req,res }: MyContext
    ) {
			let user = req.session.user
			let temp = await Employee.findOneOrFail({id: parseInt(employee)})
			if(!temp) return null;

			let workingHours = temp.workingHours.filter(item => item.pharmacy === user.pharmacy)[0]
			console.log(workingHours)

			let app = new Appointment()
			app.begin = from
			app.length = length
			app.employee = await Employee.findOneOrFail({id: parseInt(employee)})
			app.pharmacy = user.pharmacy
			return app

    }

}
