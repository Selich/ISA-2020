import { User } from '../entities/User';
import { Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../types';
import { UserResponse, EmployeeInput, LoginInput, RegisterInput } from './types/UserTypes';
import argon2 from 'argon2';
import { validateRegister } from '../utils/validators/validateRegister';
import { getRepository } from 'typeorm';
import { PatientDetails } from '../entities/PatientDetails';
import { Address } from '../entities/Address';
import { Inventory } from '../entities/Inventory';
import { Medicine } from '../entities/Medicine';
import { Pharmacy } from '../entities/Pharmacy';
import { Price } from '../entities/Price';
import { MedicineItem } from 'src/entities/MedicineItem';


const mapPrice = async (arr: Inventory):  Promise<any> =>{
  const medicines = arr.medicines
      // .createQueryBuilder("user")
      // .leftJoinAndSelect("user.workingHours", "working_hours")
      // .where("user.role = :role", { role: role })
      // .andWhere("working_hours.pharmacyID = :ID", { ID: pharmId })
      // .getMany();

  return await Price.getRepository().createQueryBuilder('price')
  .where('price.pharmacy = :pharm', {pharm: arr.pharmacy})
  .innerJoinAndSelect('price.medicine', 'medicines.medicine')
  const price = await Price.find( {pharmacy: arr.pharmacy})
  // medicines.map(item => item.price = price.price )
  // arr.medicines.map(item => item.price = arr.pharmacy.)
  // const arr = item.details.prices.filter(val => val.pharmacy == inv..filter(temp => temp.))






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

  @Query(() => [Pharmacy], { nullable: true })
  async pharmacies(
    @Arg("medicineItemID") medicineItemID: number,
    @Arg("quantity") quantity: number,
    @Ctx() { }: MyContext
  ): Promise<Pharmacy[]>{

    //! TODO:  transaction
    const list = Inventory.find({})
    ;(await list).filter(item => item.pharmacy != null)

    const newList: Inventory[] = (await list).filter(item => item.medicines.filter(item =>
      (item.id == medicineItemID) && (item.quantity >= quantity)))

    const ids = newList.map(item => item.pharmacy)

    return await ids

  }
}
