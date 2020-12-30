import User from "../entities/User";
import { MyContext } from "../types";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    return (!req.session.userId)
      ? null
      : await User.findOne({ id: req.session.userId });
  }
}
