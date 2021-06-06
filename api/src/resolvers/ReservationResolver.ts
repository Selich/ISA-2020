import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Reservation } from "../entities/Reservation";
import { Medicine } from "../entities/Medicine";
import crypto from 'crypto'
import Patient from "../entities/Patient";
import User from "../entities/User";
import { Pharmacy } from "../entities/Pharmacy";
import { Inventory } from "../entities/Inventory";
import { MedicineItem } from "../entities/MedicineItem";
import { ReservationInput, EmployeeResponse, ReservationResponse } from "./types/dtos";
import { sendReservationMail, sendReservationPickupMail } from "../utils/sendMail";
import moment from 'moment'
import jwt from "jsonwebtoken";
import { EntityManager, getConnection, getManager, Transaction, TransactionManager } from "typeorm";

function makeid(length: number) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');
}

console.log(makeid(5));

@Resolver(Reservation)
export class ReservationResolver {

  @Mutation(() => Reservation, { nullable: true })
  async getReservationByCode(
    @Arg("code") code: string
  ) {

    let res = Reservation.findOne({ code: code })
    if (!res) return null
    else return res
  }

  @Query(() => [Reservation], { nullable: true })
  async reservations(
    @Arg("token") token: string
  ) {
    let temp = jwt.decode(token)
    //@ts-ignore
    let patient = await Patient.findOneOrFail({ email: temp.email })
    let reservations = await Reservation.find({ patient: patient })

    // reservations.forEach(item => {
    //   if(new Date(item.deadline) <= new Date()){
    //     patient.penalty += 1
    //     item.remove()

    //   }
    // })
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

    // get a connection and create a new query runner
   let temp = jwt.decode(token)
    //@ts-ignore
    let user = await Patient.findOneOrFail({ id: temp.id })
    let medItem = await MedicineItem.findOneOrFail({ id: inputs.medicineId })
    let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacyId })
    let reservation = new Reservation();

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
 


    if (inputs.quantity && medItem.quantity < inputs.quantity) {
      return null
    }

    if (inputs.quantity)
      medItem.quantity -= inputs.quantity
    medItem.version += 1;

    medItem.save()

    let medicineItem = new MedicineItem();

    medicineItem.currentPrice = medItem.currentPrice;
    medicineItem.details = medItem.details;

    if (inputs.quantity)
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

    if (inputs.quantity)
      reservation.totalSum = medicineItem.currentPrice * inputs.quantity;
    reservation.code = makeid(4)


    if (!user.reservations) {
      user.reservations = []
    }


      await queryRunner.manager.save(user);
      await queryRunner.manager.save(medicineItem);
      await queryRunner.manager.save(reservation);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    sendReservationMail(user, mailer, reservation, reservation.code);

    return { reservation: reservation };
  }

  @Mutation(() => Reservation, { nullable: true })
  async cancelReservation(
    @Arg("inputs") inputs: ReservationInput,
    @Arg("token") token: string
  ) {
    let temp = jwt.decode(token)
    if (!temp) return null
    // @ts-ignore
    let patient = await Patient.findOneOrFail({ email: temp.email });
    let reservation = await Reservation.findOneOrFail({ id: inputs.id })
    let original = await MedicineItem.findOneOrFail({ id: inputs.originalId })
    let newItem = await MedicineItem.findOneOrFail({ id: inputs.medicineId })

    if (inputs.quantity)
      original.quantity += inputs.quantity

    original.save()
    reservation.remove()
    // patient.reservations.filter(item => item.id !== reservation.id)
    // patient.save()

    return null;
  }

  @Mutation(() => Reservation, { nullable: true })
  async pickupReservation(
    @Arg("inputs") inputs: ReservationInput,
    @Ctx() { req, mailer }: MyContext
  ) {

    let entityManager = getManager()
    console.log(inputs)
    //@ts-ignore
    //@ts-ignore
    let reservation = await Reservation.findOne({
      where: {
        id: inputs.id
      }
    })
    let patient = await entityManager.findOne(Patient, reservation?.patient);
    console.log(patient)

    if (!reservation) return null
    reservation.isBought = true

    if (patient) {
      patient.score += reservation.medicineItem.details.points
      console.log(reservation)
      patient.save()

    }

    reservation.save()

    // sendReservationPickupMail(user, mailer,reservation);
    return reservation


  }


}