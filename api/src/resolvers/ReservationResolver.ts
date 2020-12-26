import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Reservation } from "../entities/Reservation";
import { PatientDetails } from "../entities/PatientDetails";
import { Inventory } from "../entities/Inventory";

@Resolver(Reservation)
export class ReservationResolver {

  @Query(() => Reservation, { nullable: true })
  async reservation( @Ctx() { req }: MyContext) {
  }

  // Menjamo kolicine
  @Mutation(() => Reservation)
  async createReservation(
    @Arg("inputs") inputs: Reservation,
    @Ctx() { req }: MyContext
  ): Promise<Reservation> {

    const profile = await PatientDetails.getRepository()
                          .createQueryBuilder('patient_details')
                          .leftJoinAndSelect("patient_details.user", "user")
                          .where("user.id = :id", { id: req.session.userId })
                          .getOneOrFail()


    const list = inputs.medicines
    const arr : any[]= []
    list.forEach(item => arr.push(item.id))

    const pharmInv = Inventory.findOneOrFail({pharmacy: inputs.pharmacy})
    const items = (await pharmInv).medicines.filter(item => arr.includes(item.id))

    inputs.medicines = items
    inputs.patient = profile
    await inputs.save()

    return inputs ;
  } async create( @Ctx() { req, res }: MyContext) {
  }

  // #43
  // Change state to used
  @Mutation(() => Reservation)
  async useReservation( @Ctx() { req, res }: MyContext) {
  }
}
