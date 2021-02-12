import { Employee } from "../entities/Employee";
import { Address } from "../entities/Address";
import { Holiday } from "../entities/Holiday";
<<<<<<< HEAD
import { Pharmacy } from "../entities/Pharmacy";
import { MyContext } from "src/types";
import { Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { EmployeeResponse, UserResponse, UserDTO, AdminInput } from "./types/dtos";
import argon2 from 'argon2'
=======
import { WorkingHours } from "../entities/WorkingHours";
import { sendCreateTokenMail, sendHolidayStatusUpdate } from "../utils/sendMail";
import { Pharmacy } from "../entities/Pharmacy";
import { Appointment } from "../entities/Appointment";
import { MyContext } from "src/types";
import { Field, Arg, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { UserResponse, HolidayInput, EmployeeResponse, WorkingHoursInput, EmployeeInput } from "./types/dtos";
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


>>>>>>> dev

@Resolver()
export class EmployeeResolver {

<<<<<<< HEAD
  @Query(() => Holiday, { nullable: true })
  async holiday(@Ctx() { req }: MyContext) {
=======
  @Query(() => [Appointment], { nullable: true })
	async getSchedule(
		@Arg("token") token: string
	) {

		let temp = jwt.decode(token)
		if(!temp) return null
		//@ts-ignore
		let user = await Employee.findOneOrFail({email: temp.email});
		let app = await Appointment.find({employee: user});
    //@ts-ignore
		return app
  }

  @Query(() => Employee, { nullable: true })
	async employee(
		@Arg("token") token: string
	) {

		let temp = jwt.decode(token)
    //@ts-ignore
		return await Employee.findOne({email: temp.email});
>>>>>>> dev
  }

  @Query(() => [Employee], { nullable: true })
  async employees(
<<<<<<< HEAD
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
=======
		@Arg('inputs') inputs: EmployeeInput,
      @Ctx() { req }: MyContext
  ) {
		if(inputs.role === "any") return await Employee.find({})
		if(inputs.role) return await Employee.find({role: inputs.role})
		if(inputs.pharmacy){
			let id = parseInt(inputs.pharmacy)
			let pharmacy = await Pharmacy.findOne({id})
			return await Employee.find({pharmacy})
		}
		return await Employee.find({})
  }
  @Query(() => [Holiday], { nullable: true })
	async holidays(
		@Ctx() { req  }: MyContext
	) {
		return await Holiday.find({})
  }

  @Mutation(() => Holiday, { nullable: true })
	async requestHoliday(
		@Arg("inputs") inputs: HolidayInput,
		@Ctx() { req  }: MyContext
	) {
		let user = req.session.user
		if(!inputs.employee) return null;
		if(!user) user = await Employee.findOneOrFail({email: inputs.employee.email})
		let holiday = new Holiday()
		if(inputs.from)
			holiday.from = inputs.from
		if(inputs.until)
			holiday.until = inputs.until
		holiday.isApproved = false
		holiday.employee = user
		holiday.save()
		return holiday
  }

  @Mutation(() => Holiday, { nullable: true })
	async approveHoliday(
		@Arg("inputs") inputs: HolidayInput,
		@Ctx() { req, mailer  }: MyContext
	) {
		
		let user = req.session.user
		if(!user) {
			let list = await Employee.find({role: 'sysadmin'})
			user = list[0]
		}
		if(user.role !== 'sysadmin') return null

		if(!inputs.id) return null
		let id = parseInt(inputs.id)
		let holiday = await Holiday.findOneOrFail({id})
		if(!inputs.employee) return null
		let employee = await Employee.findOneOrFail({email: inputs.employee.email})

		let comment = ""
		if(inputs.comments){
			comment = inputs.comments
		}
		let isApproved = false
		if(inputs.isApproved) isApproved = inputs.isApproved
		sendHolidayStatusUpdate(employee,mailer,user,isApproved,comment)



		return holiday
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
  @Mutation(() => Employee)
   async removeEmployee(
     @Arg("id") id: string,
     @Ctx() { req, mailer }: MyContext
   ){
		 if(id) return null
		 let numid = parseInt(id)
		 let employee = await Employee.findOne({id: numid})
		 console.log(employee)
		 employee?.remove()
		 return employee
	 }

  @Mutation(() => EmployeeResponse)
   async addEmployee(
     @Arg("inputs") inputs: EmployeeInput,
      @Ctx() { req, mailer }: MyContext
   ){
    let user = await Employee.findOne({ email: inputs.email });
    if (user) {
      return { errors: [{ field: "email", message: "User already exists" }] };
    }
		 let pharmacy = null
		 if(inputs.role !== 'derm'){
			pharmacy = await Pharmacy.findOne({ name: inputs.pharmacy });
			if (pharmacy === undefined) {
				return { errors: [{ field: "pharmacy", message: "Pharmacy does not exist" }] };
			}

		 }


		 let employee = new Employee()
		 if(inputs.role !== 'derm' && pharmacy){
			employee.pharmacy = pharmacy
		 }
		 let hash = bcrypt.hashSync(inputs.email,10)
		 if(inputs.email)
		 employee.email = inputs.email
		 if(inputs.telephone)
		 employee.telephone = inputs.telephone
		 if(inputs.role)
		 employee.role = inputs.role
		 if(inputs.firstName)
		 employee.firstName = inputs.firstName
		 if(inputs.lastName)
		 employee.lastName = inputs.lastName
		 employee.workingHours = []
		 employee.schedule = []
		 employee.password = hash
		 employee.isEnabled = false

     employee.save();
		 sendCreateTokenMail(employee,mailer,hash)

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
    if(!user) return null
		if(user.password !== oldPass) return null;

		if(password !== confirmPassword) 
        return {
          errors: [{ field: "password", message: "passwords don't match" }],
        };

    user.isEnabled = true;
		user.save

    return { user };
  }
>>>>>>> dev
}
