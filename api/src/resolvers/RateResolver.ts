import jwt from "jsonwebtoken";
import { Employee } from "../entities/Employee";
import { Medicine } from "../entities/Medicine";
import { Pharmacy } from "../entities/Pharmacy";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Patient from "../entities/Patient";
import { Rating } from "../entities/Rating";
import { Reservation } from "../entities/Reservation";
import { EmployeeInput, MedicineInput, PharmacyInput } from "./types/dtos";
import { Appointment } from "../entities/Appointment";


@Resolver(Rating)
export class RateResolver {
  @Query(() => [Employee], { nullable: true })
	async ratingDerm( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
    if(!temp) return null
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let app = await Appointment.find({
      patient: patient,
      kind: 'derm'
    })
    let derm = app.map(item => item.employee)
    return derm
  }
  @Query(() => [Employee], { nullable: true })
	async ratingPharm( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
    if(!temp) return null
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let app = await Appointment.find({
      patient: patient,
      kind: 'pharm'
    })
    let derm = app.map(item => item.employee)
    return derm
  }
  @Query(() => [Medicine], { nullable: true })
	async ratingMedicine( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let arr = patient.reservations.map(item => item.medicineItem.details)
    let arr2 = patient.prescritions.map(item => item.medicines[0].details)
    arr = arr.concat(arr2)
    console.log(arr)
    return arr
  }
  @Query(() => [Pharmacy], { nullable: true })
	async ratingPharmacy( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let arr = patient.reservations.map(item => item.pharmacy)
    let arr2 = patient.prescritions.map(item => item.appointment.pharmacy)
    let arr3 = patient.ePrescriptions.map(item => item.pharmacy)
    arr = arr.concat(arr2)
    arr = arr.concat(arr3)
    return arr
  }


  @Query(() => [Reservation], { nullable: true })
	async reservations( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
		let reservations = await Reservation.find({patient: patient})

    reservations.forEach(item => {
      if(new Date(item.deadline) <= new Date()){
        patient.penalty += 1
        item.remove()

      }
    })
		return reservations

  }
  @Mutation(() => Rating, { nullable: true })
	async ratePharm( 
    @Arg("inputs") inputs: EmployeeInput,
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
		let employee = await Employee.findOneOrFail({id: inputs.id})
		let rt = await Rating.find({employee: employee})
    let rating = new Rating()

    rating.employee = employee
    rating.patient = patient

    if(inputs.averageRating)
      rating.rating = parseInt(inputs.averageRating)


    if(employee.ratings){
      let sum = rt.map(item => item.rating).reduce((a,b) => a + b)
      employee.averageRating = sum
    } else {
      employee.averageRating = rating.rating
    }

    rating.save()

    employee.save()

    return rating
  }
  @Mutation(() => Rating, { nullable: true })
	async rateDerm( 
    @Arg("inputs") inputs: EmployeeInput,
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
		let employee = await Employee.findOneOrFail({id: inputs.id})
		let rt = await Rating.find({employee: employee})
    let rating = new Rating()

    rating.employee = employee
    rating.patient = patient

    if(inputs.averageRating)
      rating.rating = parseInt(inputs.averageRating)


    if(employee.ratings){
      let sum = rt.map(item => item.rating).reduce((a,b) => a + b)
      employee.averageRating = sum
    } else {
      employee.averageRating = rating.rating
    }

    rating.save()


    employee.save()

    return rating
  }
  @Mutation(() => [Medicine], { nullable: true })
	async ratePharmacy( 
    @Arg("inputs") inputs: PharmacyInput,
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
		let medicine = await Medicine.findOneOrFail({id: inputs.id})
    let rating = new Rating()

    rating.medicine = medicine
    rating.patient = patient

    rating.save()
    return rating
  }
  @Mutation(() => Rating, { nullable: true })
	async rateMedicine( 
    @Arg("inputs") inputs: MedicineInput,
    @Arg("token") token: string,
  ) {
    console.log(inputs)
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
		let medicine = await Medicine.findOneOrFail({id: inputs.id})
    let rating = new Rating()

    rating.medicine = medicine
    rating.patient = patient
    if(inputs.rating)
      rating.rating = inputs.rating


    let ratings = medicine.ratings
    let sum = ratings.map(item => item.rating).reduce((a,b) => a + b)
    medicine.rating = sum


    medicine.save()


    return rating
  }
}


