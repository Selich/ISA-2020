import { Employee } from "../entities/Employee";
import { Address } from "../entities/Address";
import { Holiday } from "../entities/Holiday";
import { Pharmacy } from "../entities/Pharmacy";
import { MyContext } from "src/types";
import { Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { EmployeeResponse, UserResponse, UserDTO, AdminInput } from "./types/dtos";
import argon2 from 'argon2'

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

  @Mutation(() => EmployeeResponse)
   async addEmployee(
     @Arg("inputs") inputs: AdminInput,
     @Ctx() { req }: MyContext
   ){
		 let { email, password, firstName, lastName, telephone, street, city, country, pharmacyName, role } = inputs
    let user = await Employee.findOne({ email: email });
    let pharmacy = await Pharmacy.findOne({ name: pharmacyName });
    if (!(user === undefined)) {
      return { errors: [{ field: "email", message: "Email already exists" }] };
    }
    if (!(pharmacy === undefined)) {
      return { errors: [{ field: "pharmacyName", message: "Pharmacy does not exist" }] };
    }
		 let employee = new Employee()
		 employee.role = role
		 employee.email = email
		 employee.firstName = firstName
		 employee.lastName = lastName
		 const hashedPassword = await argon2.hash(inputs.firstName);
		 employee.password = hashedPassword
		 employee.telephone = telephone
     let address = { street, city, country };

     let temp = await Address.findOne({ ...address });
     if (temp === undefined)
       employee.address = await Address.save(
         new Address({ street, city, country, employee: employee })
       );
     else employee.address = temp;

		 //@ts-ignore
		 let pharmy = await Pharmacy.save(pharmacy,{employee})
     employee = await Employee.save(employee);
		 console.log(employee)
		 console.log(pharmy)
		 return { employee }
		 
	 }
}
