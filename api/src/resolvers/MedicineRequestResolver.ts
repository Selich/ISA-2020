import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg } from "type-graphql";
import { Holiday } from "../entities/Holiday";

@InputType()
class CalendarItem{
  @Field()
  id: number;
  @Field()
  email: string;
}

@Resolver()
export class MedicineRequestResolver {

  // #43
  @Query(() => Holiday, { nullable: true })
  async holiday( @Ctx() { req }: MyContext) {
  }

  // #43
  @Mutation(() => Holiday)
  async create(
    @Ctx() { req, res }: MyContext): Promise<void> {


  }

  @Mutation(() => Holiday)
  async update(
    @Ctx() { req, res }: MyContext) {

  }
}
