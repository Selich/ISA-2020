import { Medicine } from "../../entities/Medicine";
import { Pharmacy } from "../../entities/Pharmacy";
import { InputType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./ErrorTypes";
import User from "../../entities/User";
import Patient from "../../entities/Patient";

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
export class UserResponse {
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
@InputType()
export class PriceDTO {
  @Field(() => Pharmacy)
  pharmacy: Pharmacy;

  @Field(() => Medicine)
  medicine: Medicine;

  @Field()
  price: number;

  @Field(() => String)
  from: Date;
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

  @Field(() => [PriceDTO])
  prices: PriceDTO[];

  @Field(() => [MedicineDTO])
  alternatives: MedicineDTO[];

  @Field(() => String)
  from: Date;
  @Field(() => String)
  until: Date;
}
