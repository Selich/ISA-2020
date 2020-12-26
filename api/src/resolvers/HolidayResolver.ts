import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Holiday } from "../entities/Holiday";
import { HolidayInput } from "./types/UserTypes";
import { validateAdmin } from "../utils/validators/validateRegister";
import { User } from "../entities/User";

@Resolver(Holiday)
export class HolidayResolver {

  // #43
  @Query(() => Holiday, { nullable: true })
  async holiday(@Ctx() { req }: MyContext) {
  }

  // #43
  @Mutation(() => Holiday)
  async create(@Ctx() { req, res }: MyContext) {
  }
  @Mutation(() => Holiday)
  async createHolidays(
    @Arg("inputs") inputs: HolidayInput,
    @Ctx() { req }: MyContext
  ): Promise<Holiday> {

    const errors = validateAdmin(req.session.userId);
    const user = await User.findOneOrFail(inputs.employeeId)
    const holiday = new Holiday()
    holiday.from = new Date(inputs.from)
    holiday.until = new Date(inputs.until)
    holiday.employee = user

    return holiday

  }
}
