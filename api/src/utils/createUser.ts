import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";
import Patient from "../entities/Patient";
import { AddressInput } from "../resolvers/types/dtos";


export async function  addAddress(employee: Patient | Employee, address: AddressInput) {
     let temp = await Address.findOne({ ...address });
     if (temp === undefined)
       employee.address = await Address.save(
         new Address({ ...address, employee: employee })
       );
     else employee.address = temp;

}
