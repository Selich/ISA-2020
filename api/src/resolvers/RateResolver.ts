import jwt from "jsonwebtoken";
import { Employee } from "../entities/Employee";
import { Medicine } from "../entities/Medicine";
import { Pharmacy } from "../entities/Pharmacy";
import { Arg, Query, Resolver } from "type-graphql";
import Patient from "../entities/Patient";
import { Rating } from "../entities/Rating";
import { Reservation } from "../entities/Reservation";

@Resolver(Rating)
export class RateResolver {

  @Query(() => [Employee], { nullable: true })
	async ratingDerm( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let app = patient.appointments.filter(item => item.kind == 'derm')
    let derm = app.map(item => item.employee)
    return derm
  }
  @Query(() => [Employee], { nullable: true })
	async ratingPharm( 
    @Arg("token") token: string
  ) {
		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOneOrFail({email: temp.email})
    let app = patient.appointments.filter(item => item.kind == 'pharm')
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
}


