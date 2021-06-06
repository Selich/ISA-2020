import { Employee } from "../entities/Employee";
import { Holiday } from "../entities/Holiday";
import { WorkingHours } from "../entities/WorkingHours";
import { sendCreateTokenMail, sendHolidayStatusUpdate } from "../utils/sendMail";
import { Pharmacy } from "../entities/Pharmacy";
import { Appointment } from "../entities/Appointment";
import { MyContext } from "src/types";
import { Field, Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { UserResponse, HolidayInput, EmployeeResponse, WorkingHoursInput, EmployeeInput } from "./types/dtos";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getConnection, IsNull } from "typeorm";



@Resolver()
export class EmployeeResolver {

	@Query(() => [Holiday], { nullable: true })
	async holiday(
		@Arg('token') token: string,
		@Ctx() { req }: MyContext
	) {


		if (!token) return await Holiday.find({})
		let temp = jwt.decode(token)
		// @ts-ignore

		let user = await Employee.findOneOrFail({ email: temp.email })
		// @ts-ignore
		if (user.role === 'admin') {
			let holidays = await Holiday.find(
				{ pharmacyId: user.pharmacy.id }
			)
			return holidays
		} else if (user.role === 'sysadmin') {
			let holidays = await Holiday.find(
				{ pharmacyId: IsNull() }
			)
			return holidays

		}
		return await Holiday.find({})

	}

	@Query(() => [Appointment], { nullable: true })
	async getSchedule(
		@Arg("token") token: string
	) {

		let temp = jwt.decode(token)
		if (!temp) return null
		//@ts-ignore
		let user = await Employee.findOneOrFail({ email: temp.email });
		let app = await Appointment.find({ employee: user });
		//@ts-ignore
		return app
	}

	@Query(() => Employee, { nullable: true })
	async employee(
		@Arg("token") token: string
	) {

		let temp = jwt.decode(token)
		//@ts-ignore
		return await Employee.findOne({ email: temp.email });
	}
	@Query(() => [Employee], { nullable: true })
	async dermsByPharm(
		@Arg('token') token: string,
	) {
		let temp = jwt.decode(token)
		//@ts-ignore
		let employee = await Employee.findOne({ email: temp.email });
		return await Employee.find({
			role: 'derm',

		})

	}

	@Query(() => [Employee], { nullable: true })
	async getEmployeesByPharm(
		@Arg('inputs') inputs: EmployeeInput,
	) {
		console.log(inputs)
		if (!inputs.pharmacy) return null
		let id = parseInt(inputs.pharmacy)
		let pharm = await Pharmacy.findOneOrFail({ id: id })
		let emp = await Employee.find({ pharmacy: pharm, role: 'derm' })
		return emp
	}


	@Query(() => [Employee], { nullable: true })
	async employees(
		@Arg('inputs') inputs: EmployeeInput,
		@Arg('token') token: string,
		@Ctx() { req }: MyContext
	) {
		if (inputs.role === "any") return await Employee.find({})
		if (inputs.role === "derm") return await Employee.find({
			where: {
				role: 'derm'
			}
		})
		if (inputs.role) return await Employee.find({ role: inputs.role })
		if (inputs.role === 'pharm') {
			let temp = jwt.decode(token)
			if (!temp) return null
			// @ts-ignore
			let user = await Employee.findOne({ email: temp.email })
			if (!user) return null
			let ret = await Employee.find({})
			return ret
		}
		return await Employee.find({})
	}

	@Mutation(() => Holiday, { nullable: true })
	async requestHoliday(
		@Arg("inputs") inputs: HolidayInput,
		@Arg("token") token: string,
		@Ctx() { req }: MyContext
	) {
		let temp = jwt.decode(token)
		if (!temp) return null

		// @ts-ignore
		let user = await Employee.findOneOrFail({ email: temp.email })

		let holiday = new Holiday()
		console.log(inputs)
		if (inputs.from)
			holiday.from = inputs.from
		if (inputs.until)
			holiday.until = inputs.until

		holiday.isApproved = false
		holiday.employee = user
		if (user.role === 'pharm') {
			holiday.pharmacyId = user.pharmacy.id
		}
		holiday.save()
		return holiday
	}

	@Mutation(() => Holiday, { nullable: true })
	async denyHoliday(
		@Arg("inputs") inputs: HolidayInput,
		@Arg("token") token: string,
		@Ctx() { req, mailer }: MyContext
	) {

		if (!inputs) return null

		let holiday = await Holiday.findOneOrFail({ id: inputs.id })
		if (!inputs.employee) return null
		let employee = await Employee.findOneOrFail({ email: inputs.employee.email })

		let comment = 'Approved'
		if (inputs.comments) { comment = inputs.comments }

		holiday.isApproved = false


		sendHolidayStatusUpdate(employee, mailer, employee, holiday.isApproved, comment)

		holiday.remove()

		return holiday
	}

	@Mutation(() => Holiday, { nullable: true })
	async approveHoliday(
		@Arg("inputs") inputs: HolidayInput,
		@Arg("token") token: string,
		@Ctx() { req, mailer }: MyContext
	) {

		if (!inputs) return null

		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {

			let holiday = await Holiday.findOneOrFail({ id: inputs.id })
			if (!inputs.employee) return null
			let employee = await Employee.findOneOrFail({ email: inputs.employee.email })

			let comment = 'Approved'
			if (inputs.comments) { comment = inputs.comments }

			holiday.isApproved = true


			await queryRunner.manager.save(holiday);
			await queryRunner.commitTransaction();
			sendHolidayStatusUpdate(employee, mailer, employee, holiday.isApproved, comment)
		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}

		return holiday
	}

	@Mutation(() => Employee, { nullable: true })
	async addWorkingHours(
		@Arg("inputs") inputs: EmployeeInput,
		@Arg("token") token: string,
		@Ctx() { req }: MyContext
	) {
		let employee = await Employee.findOneOrFail({ email: inputs.email })
		let temp = jwt.decode(token)
		if (!temp) return null

		// @ts-ignore
		let user = await Employee.findOneOrFail({ email: temp.email })

		if (!employee.workingHours)
			employee.workingHours = []

		let res = employee.workingHours.filter(item => item.pharmacy === user.pharmacy)[0]

		if (!res) {
			let wh = new WorkingHours()
			wh.employee = employee
			wh.pharmacy = user.pharmacy
			res = wh
		}

		if (inputs.workingHours) {
			if (inputs.workingHours[0].from) {
				res.from = inputs.workingHours[0].from
			}
			if (inputs.workingHours[0].until) {
				res.until = inputs.workingHours[0].until
			}

		}
		res.save()



		return employee
	}
	@Mutation(() => Employee)
	async removeEmployee(
		@Arg("id") id: string,
		@Ctx() { req, mailer }: MyContext
	) {
		if (id) return null
		let numid = parseInt(id)
		let employee = await Employee.findOne({ id: numid })
		console.log(employee)
		employee?.remove()
		return employee
	}

	@Mutation(() => EmployeeResponse)
	async addEmployee(
		@Arg("inputs") inputs: EmployeeInput,
		@Arg("token") token: string,
		@Ctx() { req, mailer }: MyContext
	) {
		let user = await Employee.findOne({ email: inputs.email });
		console.log(user)
		if (user) {
			return null
		}
		let employee = new Employee()
		let hash = bcrypt.hashSync(inputs.email, 10)
		if (inputs.email)
			employee.email = inputs.email
		if (inputs.telephone)
			employee.telephone = inputs.telephone
		if (inputs.role)
			employee.role = inputs.role
		if (inputs.firstName)
			employee.firstName = inputs.firstName
		if (inputs.lastName)
			employee.lastName = inputs.lastName
		employee.password = hash
		employee.averageRating = 3
		employee.isEnabled = false
		employee.schedule = []

		if (inputs.role === 'pharm') {
			let temp = jwt.decode(token)
			// @ts-ignore
			let admin = await Employee.findOneOrFail({ email: temp.email })
			console.log(admin)
			employee.workingHours = []
			employee.pharmacy = admin.pharmacy
			let wh = new WorkingHours()
			if (inputs.workingHours) {
				if (inputs.workingHours[0].from)
					wh.from = inputs.workingHours[0].from
				if (inputs.workingHours[0].until)
					wh.until = inputs.workingHours[0].until
				wh.pharmacy = admin.pharmacy
				employee.workingHours.push(wh)
			}
		}

		employee.save();
		sendCreateTokenMail(employee, mailer, hash)
		return { employee }
	}
	@Mutation(() => UserResponse)
	async confirmPassword(
		@Arg("oldPass") oldPass: string,
		@Arg("password") password: string,
		@Arg("confirmPassword") confirmPassword: string,
		@Ctx() { req }: MyContext
	) {
		let user = req.session.user;
		if (!user) return null
		if (user.password !== oldPass) return null;

		if (password !== confirmPassword)
			return {
				errors: [{ field: "password", message: "passwords don't match" }],
			};

		user.isEnabled = true;
		user.save

		return { user };
	}
}
