import { User } from '../entities/User';
import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import { UserResponse, EmployeeInput, LoginInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { getRepository, IsNull } from 'typeorm';
import { PatientDetails } from '../entities/PatientDetails';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import { Medicine } from '../entities/Medicine';
import { Pharmacy } from '../entities/Pharmacy';
import { Price } from '../entities/Price';
import { MedicineItem } from '../entities/MedicineItem';
import { InventoryDTO, MedicineDTO, MedicineItemDTO, MedicineListDTO } from './types/dtos';
import { MedicineList } from '../entities/MedicineList';

@Resolver()
export class MedicineResolver {

  @Query(() => Inventory, { nullable: true })
  async medicinesInInventory(
    @Arg("inputs") inputs: InventoryDTO,
    @Ctx() { }: MyContext
  ): Promise<Inventory>{
    return await Inventory.findOneOrFail({...inputs})
  }

  @Query(() => [Inventory], { nullable: true })
  async inventories(
    @Arg("inputs") inputs: MedicineDTO,
    @Ctx() { }: MyContext
  ): Promise<Inventory[]>{
    let { name } = inputs
    const medicine = await Medicine.findOneOrFail({name: name})
    let arr = await MedicineItem.find({details: medicine})
    let larr = arr.map(item => item.list.id)
    return await Inventory.findByIds(larr, { supplier: IsNull()})
  }

  @Mutation(() => MedicineList, { nullable: true })
  async addMedicines(
    @Arg("inputs") inputs: MedicineListDTO,
    @Ctx() { }: MyContext
  ): Promise<any>{
    let { medicines, type, pharmacy , supplier } = inputs
    switch (type){
      case 'inventory':{
        const pharm = Pharmacy.findOneOrFail({name: pharmacy.name})
        const user = User.findOneOrFail({email: supplier.email})
        return await Inventory.save(new Inventory({medicines, pharmacy, supplier}))
      }
    }
  }
  @Query(() => [Medicine], { nullable: true })
  async medicines(
    @Arg("inputs") inputs: MedicineDTO,
    @Ctx() { }: MyContext
  ): Promise<Medicine[]>{

    return await Medicine.find({...inputs})
  }
  @Mutation(() => Medicine, { nullable: true })
  async createMedicineDefinition(
    @Arg("inputs") inputs: MedicineDTO,
    @Ctx() { }: MyContext
  ): Promise<Medicine>{

    return await Medicine.save(new Medicine({...inputs}))
  }

}
