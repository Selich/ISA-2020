import { Pharmacy } from "../../entities/Pharmacy";
import { Field, Float, ID, InputType, Int } from "type-graphql";
import { AddressDTO, DoctorDTO } from "./UserTypes";

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
export class UserDTO {
  @Field()
  firstName: string
  @Field()
  lastName: string
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
