import { MyContext } from "../types";
import { Query, Ctx, Mutation, Resolver, Arg } from "type-graphql";
import { Reservation } from "../entities/Reservation";
;

@Resolver(Reservation)
export class ReservationResolver {

//   @Query(() => Reservation, { nullable: true })
//   async reservation( @Ctx() { req }: MyContext) {
//   }

//   // Menjamo kolicine
//   @Mutation(() => Reservation)
//   async createReservation(
//     @Arg("inputs") inputs: ReservationDTO,
//     @Ctx() { req }: MyContext
//   ): Promise<Reservation> {
//     const user = await User.findOneOrFail({ id: req.session.userId });
//     const sum = inputs.medicines.map(item => item.price * item.quantity).reduce((a,b) => a+b)
//     inputs.totalSum = sum
//     inputs.isBought = false
//     return await Reservation.save(new Reservation({...inputs, user}))
//   }
//   // #43
//   // Change state to used
//   @Mutation(() => Reservation)
//   async useReservation(
//     @Arg("inputs") inputs: ReservationDTO,
//   ) {
//     return await Reservation.update({...inputs}, {...inputs, isBought: true})
//   }
}
