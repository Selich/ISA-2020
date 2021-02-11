import { Employee } from "../entities/Employee";
import { Address } from "../entities/Address";
import { Holiday } from "../entities/Holiday";
import { WorkingHours } from "../entities/WorkingHours";
import { Pharmacy } from "../entities/Pharmacy";
import { MyContext } from "src/types";
import { Field, Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { EmployeeResponse, WorkingHoursInput, EmployeeInput } from "./types/dtos";
import argon2 from 'argon2'



@Resolver()
export class EmployeeResolver {


  @Query(() => [Employee], { nullable: true })
  async employees(
      @Ctx() { req }: MyContext
  ) {
      return await Employee.find({})
  }

  @Mutation(() => Employee, { nullable: true })
	async addWorkingHours(
		@Arg("inputs") inputs: WorkingHoursInput,
		@Ctx() { req  }: MyContext
	) {
		if(!inputs.employee) return null
		if(!inputs.employee.email) return null
		let employee = await Employee.findOneOrFail({email: inputs.employee.email})
		
		if(!inputs.pharmacy) return null
		if(!inputs.pharmacy.id) return null
		let id = parseInt(inputs.pharmacy.id)
		let pharmacy = await Pharmacy.findOneOrFail({id: id})

		if(!employee.workingHours) employee.workingHours = []
		let res = employee.workingHours.filter(item => item.pharmacy === pharmacy)[0]
		if(!res){
			let wh = new WorkingHours()
			wh.employee = employee
			wh.pharmacy = pharmacy
			res = wh
		}
		

		if(!inputs.from) return null
		res.from = inputs.from
		if(!inputs.until) return null
		res.until = inputs.until

		employee.workingHours.push(res)

		res.save()
		employee.save()

		return employee


  }

  @Mutation(() => EmployeeResponse)
   async addEmployee(
     @Arg("inputs") inputs: EmployeeInput,
   ){
    let user = await Employee.findOne({ email: inputs.email });
    if (!(user === undefined)) {
      return { errors: [{ field: "email", message: "User already exists" }] };
    }
    let pharmacy = await Pharmacy.findOne({ name: inputs.pharmacy });
    if (pharmacy === undefined) {
      return { errors: [{ field: "pharmacy", message: "Pharmacy does not exist" }] };
    }

		 let employee = new Employee({...EmployeeInput})
		 if(!inputs.password) return
		 const hashedPassword = await argon2.hash(inputs.password);
		 employee.password = hashedPassword
		 employee.workingHours = []

     let temp = await Address.findOne({ ...inputs.address });
     if (temp === undefined)
       employee.address = await Address.save(
         new Address({ ...inputs.address, employee: employee })
       );
     else employee.address = temp;

		 employee.pharmacy = pharmacy
     employee = await Employee.save(employee);
		 return { employee }
	 }
}
