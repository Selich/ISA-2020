import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Reservation } from "../entities/Reservation";
import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import { Pharmacy } from "../entities/Pharmacy";
import { Inventory } from "../entities/Inventory";
import { MedicineItem } from "../entities/MedicineItem";
import { ReservationInput, EmployeeResponse } from "./types/dtos";
import { sendReservationMail,sendReservationPickupMail } from "../utils/sendMail";
import moment from 'moment'
import jwt from "jsonwebtoken";

@Resolver(Reservation)
export class ReservationResolver {


  @Query(() => [Reservation], { nullable: true })
	async reservations( @Arg("token") token: string) {

		let temp = jwt.decode(token)
    //@ts-ignore
		let patient = await Patient.findOne({email: temp.email})
		if(!patient) return null

		return patient.reservations
  }
  @Query(() => [Reservation], { nullable: true })
	async res() {

		let reservations = await Reservation.find({});
		return reservations
  }


  @Mutation(() => Reservation, { nullable: true })
  async reserveMedicine(
    @Arg("inputs") inputs: ReservationInput,
    @Ctx() { req, mailer }: MyContext
  ) {
    let user = req.session.user;
    if (!user)
			//@ts-ignore
      user = await Patient.findOneOrFail({ email: inputs.patient.email });
		console.log(user)


    if (!inputs.medicineItem.id) return null;
    //@ts-ignore
    let medicineId = parseInt(inputs.medicineItem.id);
    //@ts-ignore
    let id = parseInt(inputs.pharmacy.id);
		let medItem = await MedicineItem.findOneOrFail({id: medicineId})
		console.log(medItem)

    let reservation = new Reservation();
    let medicineItem = new MedicineItem();
    medicineItem.currentPrice = medItem.currentPrice;
    medicineItem.details = medItem.details;
		if(inputs.medicineItem.quantity)
    medicineItem.quantity = inputs.medicineItem.quantity;
    medicineItem.reservation = reservation;
    medicineItem.save();

    if(!inputs.medicineItem) return null;

    medItem.quantity = medItem.quantity - medicineItem.quantity;
    medItem.version = medItem.version + 1;
    medItem.save();

    reservation.pharmacy = await Pharmacy.findOneOrFail({ id });
    reservation.medicineItem = medicineItem;
    reservation.patient = user;
    if (inputs.deadline) reservation.deadline = inputs.deadline;
    reservation.isBought = false;
    reservation.totalSum = medicineItem.currentPrice * medicineItem.quantity;
    reservation.save();

		user.reservations.push(reservation)
		user.save()

		let code = 'random_code'
    sendReservationMail(user, mailer, reservation, code);

    return reservation;
  }

  @Mutation(() => [Reservation], { nullable: true })
	async cancelReservation(
		@Arg("inputs") inputs: ReservationInput
	) {
    if (!inputs.id) return null;
    let id = parseInt(inputs.id);
    let reservation = await Reservation.findOneOrFail({ id });

		let deadlineDate = new Date(reservation.deadline)
		let nextDay = moment(deadlineDate).hours(24)
		if(nextDay >= moment()){
			return null
		}

    //@ts-ignore
    let pharmId = parseInt(inputs.pharmacy.id);
    let pharmacy = await Pharmacy.findOneOrFail({ id: pharmId });
		let medicineItem = pharmacy.inventory.medicines.filter(item => item.id === reservation.medicineItem.id)[0]

		medicineItem.quantity += reservation.medicineItem.quantity
		medicineItem.save()

    return reservation;
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


