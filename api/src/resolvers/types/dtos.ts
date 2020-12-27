import { Pharmacy } from "../../entities/Pharmacy";
import { Field, Float, ID, InputType, Int } from "type-graphql";
import { AddressDTO, DoctorDTO, UserDTO } from "./UserTypes";
import { User } from "../../entities/User";
import { MedicineList } from "../../entities/MedicineList";
import { MedicineItem } from "src/entities/MedicineItem";

@InputType()
export class PharmacyDTO {

  @Field({nullable: true})
  name: string
  @Field({nullable: true})
  address: AddressDTO
  @Field({nullable: true})
  long: number
  @Field({nullable: true})
  lat: number
}
@InputType()
export class AppointmentDTO {
  @Field()
  id: number;
  @Field()
  from: string;
  @Field()
  until: string;
  @Field()
  type: string;
  @Field()
  price: number;
}
@InputType()
export class PharmDTO {
  @Field()
  id: number
  @Field()
  name: string
  @Field()
  rating: number
}

@InputType()
export class UserConsulation {
  @Field()
  from: Date
  @Field()
  pharmacy: PharmDTO
}

@InputType()
export class MedicineDTO {
  @Field({nullable: true})
  name: string
  @Field({nullable: true})
  code: string
  // @Field(() => [MedicineDTO], {nullable: true})
  alternatives: MedicineDTO[];
}


@InputType()
export class MedicineItemDTO {
  @Field(() => MedicineListDTO,{nullable: true})
  list: MedicineList;
  @Field({ nullable: true})
  quantity: number;
  @Field({nullable: true})
  price: number;
  @Field({nullable: true})
  details: MedicineDTO;
  @Field({nullable: true})
  name: string
  @Field({nullable: true})
  pharmacy: PharmDTO
}

@InputType()
export class MedicineListDTO {
  @Field({nullable: true})
  type: string;
  @Field(() => MedicineItemDTO,{nullable: true})
  medicines: MedicineItem[];
  @Field(() => UserDTO, { nullable: true })
  supplier: User;
  @Field(() => PharmacyDTO, { nullable: true })
  pharmacy: Pharmacy;
}
@InputType()
export class InventoryDTO{

  @Field(() => UserDTO)
  supplier: User;

  @Field(() => PharmacyDTO)
  pharmacy: Pharmacy;

}
@InputType()
export class AdminExam {
  @Field(() => String, { nullable: true })
  type: string
  @Field(() => String, { nullable: true })
  from: Date
  @Field(() => String, { nullable: true })
  until: Date
  @Field(() => Float,{nullable: true, defaultValue: 0})
  discount: number
  @Field({nullable: true})
  price: number
  @Field({nullable: true})
  doctor: DoctorDTO
  @Field({nullable: true})
  pharmacy: PharmacyDTO
}


@InputType()
export class AppointmentRequest {
  @Field()
  from: Date
  @Field()
  until: Date
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  pharmacyName: string
}

@InputType()
export class AppointmentDefinitionDTO {

  @Field({ nullable: true})
  type: string;
  @Field({ nullable: true})
  score: number;
  @Field({ nullable: true})
  price: number;
  @Field(() => PharmacyDTO,{ nullable: true})
  pharmacy: Pharmacy;

}
