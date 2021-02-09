import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { getRepository, IsNull } from 'typeorm';
import { Address } from '../entities/Address';
import  Patient from '../entities/Patient';
import { Medicine } from '../entities/Medicine';
import { EPrescription } from '../entities/EPrescription';

@Resolver()
export class MedicineResolver {

		@Mutation(() => [EPrescription], { nullable: true })
		async eprescriptions(
			@Arg("email") email: string,
			@Ctx() { res }: MyContext
		) {
			let user = await Patient.findOneOrFail({email: email})
			return await EPrescription.find({patient: user})
		}

    @Query(() => [Medicine], { nullable: true })
    async shop(
        @Ctx() { }: MyContext
    ): Promise<Medicine[]>{
        return await Medicine.find({})
    }

//   // @Query(() => [Inventory], { nullable: true })
//   // async inventories(
//   //   @Arg("inputs") inputs: MedicineDTO,
//   //   @Ctx() { }: MyContext
//   // ): Promise<Inventory[]>{
//   //   let { name } = inputs
//   //   const medicine = await Medicine.findOneOrFail({name: name})
//   //   let arr = await MedicineItem.find({details: medicine})
//   //   let larr = arr.map(item => item.list.id)
//   //   return await Inventory.findByIds(larr, { supplier: IsNull()})
//   // }

//   // @Mutation(() => MedicineList, { nullable: true })
//   // async addMedicines(
//   //   @Arg("inputs") inputs: MedicineListDTO,
//   //   @Ctx() { }: MyContext
//   // ): Promise<any>{
//   //   let { medicines, type, pharmacy , supplier } = inputs
//   //   switch (type){
//   //     case 'inventory':{
//   //       const pharm = Pharmacy.findOneOrFail({name: pharmacy.name})
//   //       const user = User.findOneOrFail({email: supplier.email})
//   //       return await Inventory.save(new Inventory({medicines, pharmacy, supplier}))
//   //     }
//   //   }
//   // }
//   // @Query(() => [Medicine], { nullable: true })
//   // async medicines(
//   //   @Arg("inputs") inputs: MedicineDTO,
//   //   @Ctx() { }: MyContext
//   // ): Promise<Medicine[]>{

//   //   return await Medicine.find({...inputs})
//   // }
//   // @Mutation(() => Medicine, { nullable: true })
//   // async createMedicineDefinition(
//   //   @Arg("inputs") inputs: MedicineDTO,
//   //   @Ctx() { }: MyContext
//   // ): Promise<Medicine>{

//   //   return await Medicine.save(new Medicine({...inputs}))
//   // }

}
