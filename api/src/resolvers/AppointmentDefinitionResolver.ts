import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Field, InputType, Arg, Int } from "type-graphql";
import { AppointmentDefinition } from "../entities/AppointmentDefinition";
import { AppointmentDefinitionDTO } from "./types/dtos";


@Resolver(AppointmentDefinition)
export class AppointmentDefinitionResolver {

  @Query(() => [AppointmentDefinition], { nullable: true })
  async appointmentDefinitions(
    @Ctx() { req }: MyContext)
  {
    return await AppointmentDefinition.find({})
  }
  @Mutation(() => AppointmentDefinition, { nullable: true })
  async createAppointmentDefinition(
    @Arg('inputs') inputs: AppointmentDefinitionDTO,
    @Ctx() { req }: MyContext)
  {
    return await AppointmentDefinition.save(new AppointmentDefinition({...inputs}))
  }

}
