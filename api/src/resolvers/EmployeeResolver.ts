// import { MyContext } from "../types";
// import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg, ObjectType } from "type-graphql";
// import { Holiday } from "../entities/Holiday";
// import { dateFormat } from '../constants'
// import { Address } from "../entities/Address";
// import { validateAdmin } from "../utils/validators/validateRegister";
// import { UserResponse, EmployeeDTO } from "./types/UserTypes";
// import argon2 from 'argon2'
// import { WorkingHours } from "../entities/WorkingHours";
// import { Appointment } from "../entities/Appointment";
// import { Between } from "typeorm";
// import { GraphQLList } from "graphql";
// import { Employee } from "../entities/Employee";

import { Employee } from "../entities/Employee";
import { Holiday } from "../entities/Holiday";
import { MyContext } from "src/types";
import { Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { UserDTO } from "./types/dtos";


/*
Resiti zakazivanje termina- Employee ne moze da se nadje na dva mesta istovremeno
Prilikom zakazivanja termina
1.PESIMISTICKI BLOKIRATI TABELU TERMINA
2.Proveriti da li novi termin moze da se doda (da li ima preklapanja)
3.Ako moze dodaj termin
4.Otkljucaj tabelu termina
*/
@Resolver()
export class EmployeeResolver {

  @Query(() => Holiday, { nullable: true })
  async holiday(@Ctx() { req }: MyContext) {
  }

  @Query(() => [Employee], { nullable: true })
  async employees(
      @Ctx() { req }: MyContext
  ) {
      return await Employee.find({})
  }

  @Mutation(() => Employee, { nullable: true })
  async employeeDetails(
			@Arg('inputs') inputs: UserDTO,
      @Ctx() { req }: MyContext
  ) {
		let { email } = inputs
		let user  = await Employee.findOneOrFail({email})
		if(user === undefined){
			return null
		} 

		return user
  }

  // @Query(() => OutputDermExam, { nullable: true })
  // async appointmentsInInterval(
  //   @Arg("inputs") inputs: GetDermExam,
  //   @Ctx() { req }: MyContext
  // ) {
  //   const pharmacy = req.session.pharmacy
  //   const day = new Date(inputs.from)
  //   const tomorrow = new Date(day.getDate() + 1)
  //   const doctor = await User.findOneOrFail({ id: inputs.employee.id })
  //   const workingHours = await WorkingHours.findOneOrFail({
  //     where: {
  //       doctor: doctor,
  //       pharmacyID: pharmacy.id
  //     }
  //   })
  //   const appointments = await Appointment.find({
  //     where: {
  //       from: Between(day, tomorrow),
  //       doctor: doctor,
  //       pharmacy: pharmacy
  //     }
  //   })
  //   let onVacation = false
  //   const holiday = await Holiday.find({
  //     where:{
  //       employee: doctor,
  //     }
  //   })

  //   holiday.filter( item => item.until > day && day > item.from )
  //   if(holiday.length > 0) onVacation = true

  //   const ret = new OutputDermExam()
  //   ret.appointments = appointments
  //   ret.onVacation = onVacation

  //   return ret


  // }

  // @Mutation(() => UserResponse)
  // async createEmployee(
  //   @Arg("inputs") inputs: EmployeeInput,
  //   @Ctx() { req }: MyContext
  // ){

  //   const errors = validateAdmin(req.session.userId);
  //   return null

  //   // const user = new User();
  //   // const hashedPassword = await argon2.hash(inputs.firstName);
  //   // user.email = inputs.email;
  //   // user.password = hashedPassword
  //   // user.role = inputs.role;
  //   // user.firstName = inputs.firstName;
  //   // user.lastName = inputs.lastName;
  //   // const wh = new WorkingHours()
  //   // const list: WorkingHours[] = []
  //   // const newUser = await user.save()
  //   // wh.employee = await Employee.findOneOrFail({ id: newUser.id })
  //   // wh.pharmacyID = 1
  //   // const l = list.concat(wh)

  //   // newUser.workingHours = l
  //   // return { user };
  // }

  // @Mutation(() => Holiday)
  // async updateEmployee(
  //   @Arg("input") input: EmployeeInput,
  //   @Ctx() { req, res }: MyContext) {
  //   const user = await User.findOne({ id: input.id })
  //   const address = await Address.findOne(
  //     {
  //       where:
  //       {
  //         street: input.street,
  //         city: input.city,
  //         country: input.country,
  //       }
  //     }
  //   )
  //   if (!user) return
  //   if (!address) {
  //     user.address = new Address()
  //   }
  //   user.address.street = input.street
  //   user.address.city = input.city
  //   user.address.country = input.country
  //   user.address.save()
  //   user.email = input.email
  //   user.password = input.password
  //   user.firstName = input.firstName
  //   user.lastName = input.lastName
  //   user.gender = input.gender
  //   user.telephone = input.telephone
  //   user.dateOfBirth = new Date(input.dateOfBirth)
  //   user.save()
  // }
}
