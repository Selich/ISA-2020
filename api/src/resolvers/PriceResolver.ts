import { Holiday } from "../entities/Holiday";
import { Medicine } from "../entities/Medicine";
import { Price } from "../entities/Price";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { HolidayDTO, PriceDTO } from "./types/dtos";
import { Pharmacy } from "../entities/Pharmacy";

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


}
