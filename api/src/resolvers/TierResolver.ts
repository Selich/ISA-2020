// // import { Reservation } from "../entities/Reservation"
// import { Tier } from "../entities/Tier"
// import { MyContext } from "../types"
// import { Query, Ctx, Resolver, Mutation, Arg } from "type-graphql"
// import { ReservationDTO, TierDTO } from "./types/dtos"
// @Resolver(Tier)
// export class TierResolver {

//   @Query(() => [Tier], { nullable: true })
//   async tiers() {
//     return await Tier.find({})
//   }


//   @Mutation(() => Tier)
//   async createTier(
//     @Arg("inputs") inputs: TierDTO
//   ): Promise<Tier> {
//     return await Tier.save(new Tier({...inputs}))
//   }

//   // @Mutation(() => Tier)
//   // async upgradeTier(
//   //   @Arg("inputs") inputs: Patient
//   // ): Promise<Tier> {
//   //   let tiers = await Tier.find({})

//   //   for (const tier of tiers) {
//   //     if(tier.scoreMin < inputs.score && tier.scoreMax > inputs.score) {
//   //       return await Patient.update({id: inputs.id}, {...inputs, tier})
//   //     }
//   //   }

//   // }

// }
