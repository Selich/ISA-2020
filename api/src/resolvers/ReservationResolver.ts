import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Reservation } from "../entities/Reservation";
import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import User from "../entities/User";
import { Pharmacy } from "../entities/Pharmacy";
import { Inventory } from "../entities/Inventory";
import { MedicineItem } from "../entities/MedicineItem";
import { ReservationInput, EmployeeResponse, ReservationResponse } from "./types/dtos";
import { sendReservationMail,sendReservationPickupMail } from "../utils/sendMail";
import moment from 'moment'
import jwt from "jsonwebtoken";

@Resolver(Reservation)
export class ReservationResolver {


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
  @Query(() => [Reservation], { nullable: true })
	async res() {

		let reservations = await Reservation.find({});
		return reservations
  }

  // @Field(() => [FieldError], { nullable: true })
  // errors?: FieldError[];

  // @Field(() => Reservation, { nullable: true })
  // Reservation?: Reservation;

  @Mutation(() => ReservationResponse, { nullable: true })
  async reserveMedicine(
    @Arg("inputs") inputs: ReservationInput,
    @Arg("token") token: string,
    @Ctx() { mailer }: MyContext
  ) {
    
		let temp = jwt.decode(token)
    //@ts-ignore
		let user = await Patient.findOneOrFail({id: temp.id})
		let medItem = await MedicineItem.findOneOrFail({id: inputs.medicineId})
		let pharmacy = await Pharmacy.findOneOrFail({id: inputs.pharmacyId})


    if(inputs.quantity && medItem.quantity < inputs.quantity){
      return null
    }

    if(inputs.quantity)
      medItem.quantity -= inputs.quantity
    medItem.version += 1;

    let reservation = new Reservation();
    medItem.save()

    let medicineItem = new MedicineItem();

    medicineItem.currentPrice = medItem.currentPrice;
    medicineItem.details = medItem.details;

		if(inputs.quantity)
      medicineItem.quantity = inputs.quantity;

    medicineItem.reservation = reservation;
    medicineItem.save();

    console.log(inputs)

    if (inputs.deadline) reservation.deadline = inputs.deadline;
    reservation.medicineItem = medicineItem;
    reservation.originalId = medItem.id;
    reservation.pharmacy = pharmacy;

    
    reservation.patient = user;
    reservation.isBought = false;

		if(inputs.quantity)
    reservation.totalSum = medicineItem.currentPrice * inputs.quantity;

    reservation.save()

    if(!user.reservations){
      user.reservations = []
    }
		user.reservations.push(reservation)
		user.save()

    if(inputs.medicineId && inputs.pharmacyId){
      let code = inputs.pharmacyId + inputs.medicineId + '' 
      sendReservationMail(user, mailer, reservation, code);
    }

    return {reservation: reservation};
  }

  @Mutation(() => Reservation, { nullable: true })
	async cancelReservation(
		@Arg("inputs") inputs: ReservationInput,
		@Arg("token") token: string
	) {
		let temp = jwt.decode(token)
    if(!temp) return null
    let patient = await Patient.findOneOrFail({email: temp.email});
    let reservation = await Reservation.findOneOrFail({ id: inputs.id })
    let original = await MedicineItem.findOneOrFail({ id: inputs.originalId })
    let newItem = await MedicineItem.findOneOrFail({ id: inputs.medicineId })

    if(inputs.quantity)
		  original.quantity += inputs.quantity

    original.save()
    reservation.remove()
    // patient.reservations.filter(item => item.id !== reservation.id)
    // patient.save()

    return null;
  }

  @Mutation(() => Reservation, { nullable: true })
	async pickupReservation(
		@Arg("token") token: string,
    @Ctx() { req, mailer }: MyContext
	) {

		let user = req.session.user
		if(user.role !== 'admin') return null
		let temp = jwt.decode(token)

		//@ts-ignore
		let reservation = await Reservation.findOne( {id: temp.id, pharmacy: user.pharmacy})

		if(!reservation ||  moment(reservation.deadline).hours(24) >= moment() ){
			return null
		}

		reservation.isBought = true
		reservation.save()

    sendReservationPickupMail(user, mailer,reservation);
		return reservation


	}
}


