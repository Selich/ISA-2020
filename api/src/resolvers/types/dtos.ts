import { Medicine } from "../../entities/Medicine";
import { Pharmacy } from "../../entities/Pharmacy";
import { InputType, Field, ObjectType, Float } from "type-graphql";
import { FieldError } from "./ErrorTypes";
import User from "../../entities/User";
import {Employee} from "../../entities/Employee";
import Patient from "../../entities/Patient";
import { FieldsOnCorrectTypeRule } from "graphql";

@InputType()
export class AdminInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  telephone: string;
  @Field()
  street: string;
  @Field()
  city: string;
  @Field()
  country: string;
  @Field()
  pharmacyName: string;
  @Field()
  role: string;
}

@InputType()
export class PharmacyDTO {
  @Field()
  name: string;
  @Field()
  street: string;
  @Field()
  city: string;
  @Field()
  country: string;
}

@InputType()
export class TierDTO {
  @Field()
  name: String;
  @Field()
  discount: number;
  @Field()
  scoreMin: number;
  @Field()
  scoreMax: number;
}
@InputType()
export class MedicineDTO {

  @Field(() => String)
  code!: string;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  type: string;
  @Field()
  points: number;
  @Field()
  form: string;
  @Field()
  contents: string;
  @Field()
  producer: string;
  // @Field(() => File)
  // image: string;
  @Field(() => Boolean)
  isPrescriptionRequired: boolean;
  @Field(() => String)
  info: string;
  @Field(() => [Float]) 
  prices: number[];
  @Field(() => [MedicineDTO])
  alternatives: MedicineDTO[];
  @Field(() => String)
  from: Date;
  @Field(() => String)
  until: Date;
}

@InputType()
export class MedicineItemDTO {

  @Field(() => MedicineDTO)
  details: MedicineDTO;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field(() => String)
  dateOfPurchase: Date;

  @Field()
  instructions: string;
}

@InputType()
export class MedicineListDTO {
  @Field(() => [MedicineItemDTO])
  list: MedicineItemDTO[];
}

@InputType()
export class PatientDTO {
  // @Field(() => [AppointmentDTO])
  // appointments: AppointmentDTO[];
  // @Field(() => [MedicineDTO])
  // allergies: MedicineDTO[];
  // @Field(() => [PrescritionDTO])
  // prescritions: PrescritionDTO[];
  // @Field(() => [ReservationDTO])
  // reservations: ReservationDTO[];
  // @Field(() => [RatingDTO])
  // ratings: RatingDTO[];
  // @Field(() => [PharmacyDTO])
  // subscriptions: PharmacyDTO[];
  // @Field(() => [ComplaintDTO])
  // complaints: ComplaintDTO[];
  @Field(() => TierDTO)
  tier: TierDTO;
  @Field()
  score: number;
  @Field()
  penalty: number;
  @Field()
  isEnabled: boolean;
}

@InputType()
export class AddressDTO {

  // @Field(() => number)
  // pharmacy: number

  @Field({ nullable: true})
  street: string;

  @Field({ nullable: true})
  city: string;

  @Field({ nullable: true})
  country: string;

}
@ObjectType()
export class EmployeeResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Employee, { nullable: true })
  user?: Employee;
}

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  user?: Patient;
}

@InputType()
export class UserDTO {
  @Field(() => String, { nullable: true })
  email: string;
  @Field(() => String, { nullable: true })
  password: string;
  @Field({ nullable: true})
  role: string;
  @Field({ nullable: true})
  firstName: string;
  @Field({ nullable: true})
  lastName: string;
  @Field({ nullable: true})
  gender: string;
  @Field(() => String, { nullable: true })
  dateOfBirth: Date;
  @Field(() => AddressDTO, { nullable: true})
  address: AddressDTO;
  @Field({ nullable: true})
  telephone: string;
}
@InputType()
export class RegisterPatientDTO{
  @Field({ nullable: true})
  confirmPassword: string;
  @Field(() => String, { nullable: true })
  email: string;
  @Field(() => String, { nullable: true })
  password: string;
  @Field({ nullable: true})
  role: string;
  @Field({ nullable: true})
  firstName: string;
  @Field({ nullable: true})
  lastName: string;
  @Field({ nullable: true})
  gender: string;
  @Field(() => String, { nullable: true })
  dateOfBirth: Date;
  @Field(() => AddressDTO, { nullable: true})
  address: AddressDTO;
  @Field({ nullable: true})
  telephone: string;

}


export class AppointmentDTO {

  @Field(() => PatientDTO)
  patient: PatientDTO;

  @Field(() => UserDTO)
  employee: UserDTO;

  // @Field(() => PharmacyDTO)
  // pharmacy: PharmacyDTO;

  // @Field(() => Prescrition)
  // @OneToOne(() => Prescrition, item => item.appointment ,{  cascade: true, nullable:true})
  // @JoinColumn()
  // prescription: Prescrition;

  @Field()
  type: string;

  @Field()
  score: number;

  @Field()
  price: number;

  @Field()
  discount: number;

  @Field()
  report: string;

  @Field()
  isVisited: boolean;

  @Field(() => String)
  from: Date;

  @Field(() => String)
  until: Date;

}
