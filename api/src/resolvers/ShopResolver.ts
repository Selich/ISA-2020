import { User } from '../entities/User';
import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import { UserResponse, EmployeeInput, LoginInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { getRepository } from 'typeorm';
import { PatientDetails } from '../entities/PatientDetails';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import { Medicine } from '../entities/Medicine';
import { Pharmacy } from '../entities/Pharmacy';
import { Price } from '../entities/Price';
import { MedicineItem } from '../entities/MedicineItem';


const mapPrice = async (arr: Inventory):  Promise<any> =>{
  return await Price.getRepository().createQueryBuilder('price')
  .where('price.pharmacy = :pharm', {pharm: arr.pharmacy})
  .innerJoinAndSelect('price.medicine', 'medicines.medicine')
}

@Resolver()
export class ShopResolver {

  // Dobije sve apoteke
  @Query(() => [Medicine], { nullable: true })
  async medicines(
    @Ctx() { }: MyContext
  ): Promise<Medicine[]>{

    return await Medicine.find({})

  }
}
