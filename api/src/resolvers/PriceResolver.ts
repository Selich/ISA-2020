import { Holiday } from "../entities/Holiday";
import { Medicine } from "../entities/Medicine";
import { Price } from "../entities/Price";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { HolidayDTO, PharmacyDTO, PriceDTO } from "./types/dtos";
import { Pharmacy } from "../entities/Pharmacy";
import { Order } from "../entities/Order";
import { Reservation } from "../entities/Reservation";
import { Between } from "typeorm";

@Resolver(Price)
export class PriceResolver {

  @Query(() => [Price], { nullable: true })
  async prices() { return await Price.find({}) }

  @Mutation(() => Price, { nullable: true })
  async addPrice(
    @Arg("inputs") inputs: PriceDTO
  ) {
    let medicine = await Medicine.findOneOrFail({name: inputs.medicine.name})
    let pharmacy = await Pharmacy.findOneOrFail({name: inputs.pharmacy.name})
    return await Price.save(new Price({...inputs, medicine, pharmacy}))
  }

  @Mutation(() => Object, { nullable: true })
  async getRepost(
    @Arg("inputs") inputs: PharmacyDTO,
    @Arg("from") from: string,
    @Arg("until") until:  string
  ) {
    const pharmacy = await Pharmacy.findOneOrFail({ name: inputs.name })
    const reservations = await Reservation.find({isBought: true, pharmacy: pharmacy, pickupDate: Between(new Date(from), new Date(until))})








  }


}
