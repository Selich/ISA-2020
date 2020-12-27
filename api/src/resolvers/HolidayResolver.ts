import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Holiday } from "../entities/Holiday";
import { HolidayInput, UserDTO } from "./types/UserTypes";
import { validateAdmin } from "../utils/validators/validateRegister";
import { User } from "../entities/User";
import { HolidayDTO } from "./types/dtos";

@Resolver(Holiday)
export class HolidayResolver {

  // #43
  @Query(() => [Holiday], { nullable: true })
  async holidays() {
    return await Holiday.find({})
  }


  @Query(() => [Holiday], { nullable: true })
  async holidaysByUser(
    @Arg("inputs") inputs: UserDTO
  ) {
    const user = await User.findOneOrFail({email: inputs.email})
    return user.holidays
  }

  @Mutation(() => Holiday, { nullable: true })
  async scheduleHoliday(
    @Ctx() { req }: MyContext,
    @Arg("inputs") inputs: HolidayDTO
  ) {
    let { from, until } = inputs
    if(!req.session.userId) return null
    const user = await User.findOneOrFail({id: req.session.userId})

    from = new Date(from)
    until = new Date(until)
    let isApproved = false

    return await Holiday.save(new Holiday({from,until,user,isApproved}))
  }

  @Mutation(() => Holiday, { nullable: true })
  async approveHoliday(
    @Arg("inputs") inputs: HolidayDTO,
  ) {
    let { from, until } = inputs
    const user = await User.findOneOrFail({email: inputs.user.email})

    from = new Date(from)
    until = new Date(until)
    let isApproved = true

    return await Holiday.update({user: user},{from,until,user,isApproved})
  }

}
