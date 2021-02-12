<<<<<<< HEAD
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

=======
import { InputType, Field, ObjectType, Float } from "type-graphql";
import { FieldError } from "./ErrorTypes";
import User from "../../entities/User";
import Patient from "../../entities/Patient";
import {MedicineItem} from "../../entities/MedicineItem";

@ObjectType()
export class PatientResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  user?: Patient;

}

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  user?: Patient;

  @Field(() => Boolean, { nullable: true })
  isEnabled?: boolean;
}

@ObjectType()
export class EmployeeResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

}

@InputType()
export class AddressInput {
  @Field({ nullable: true })
  street?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true})
  country?: string;
}


@InputType()
export class PharmacyInput {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  address?: AddressInput;
}

@InputType()
export class InventoryInput {
  @Field(() => [MedicineItemInput], { nullable: true })
  medicines?: MedicineItemInput[];
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  pharmacy?: PharmacyInput;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  confirmPassword?: string;
  @Field({ nullable: true})
  role?: string;
  @Field({ nullable: true})
  firstName?: string;
  @Field({ nullable: true})
  lastName?: string;
  @Field(() => AddressInput, { nullable: true})
  address?: AddressInput;
  @Field({ nullable: true})
  telephone?: string;
}
@InputType()
export class PatientInput extends UserInput{
  @Field({ nullable: true})
  tier?: string;
  @Field({ nullable: true})
  score?: string;
  @Field({ nullable: true})
  penalty?: string;
}

@InputType()
export class EmployeeInput extends UserInput{
  @Field({ nullable: true})
  pharmacy?: string;
  @Field({ nullable: true})
  averageRating?: string;
  @Field(() => [WorkingHoursInput],{ nullable: true})
  workingHours?: [WorkingHoursInput];
}
@InputType()
export class MedicineInput {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  code?: string;
	@Field(() => String, {nullable: true})
  kind?: string;
	@Field({nullable: true})
  points?: number;
	@Field({nullable: true})
  form?: string;
	@Field({nullable: true})
  contents?: string;
	@Field({nullable: true})
  producer?: string;
	@Field(() => Float, {nullable: true})
  rating?: number;
	@Field(() => Boolean, {nullable:true})
  isPrescriptionRequired?: boolean;
	@Field(() => String, {nullable: true})
  info?: string;
}

@InputType()
export class MedicineItemInput {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  name?: string;
  @Field(() => MedicineInput, { nullable: true })
  details?: MedicineInput;
	@Field(() => InventoryInput, { nullable:true })
  list: InventoryInput;
	@Field({nullable:true})
  quantity?: number;
	@Field({nullable:true})
  currentPrice?: number;
	@Field(() => String, {nullable:true})
  dateOfPurchase?: string;
	@Field(() => String, {nullable:true})
  instructions?: string;
}


@InputType()
export class AppointmentInput {
  @Field({ nullable: true })
  patient?: PatientInput;
  @Field({ nullable: true })
  employee?: EmployeeInput;
  @Field({ nullable: true})
  pharmacy?: PharmacyInput;
  @Field({ nullable: true})
  kind?: string;
  @Field({ nullable: true})
  score?: number;
  @Field({ nullable: true})
  price?: number;
  @Field({ nullable: true})
  discount?: number;
  @Field({ nullable: true})
  report?: string;
  @Field({ nullable: true})
  isVisited?: string;
  @Field({ nullable: true})
  begin?: string;
  @Field({ nullable: true})
  length?: number;
}

@ObjectType()
@InputType()
export class WorkingHoursInput{
  @Field({ nullable: true})
  until?: string;
  @Field({ nullable: true})
  from?: string;
  @Field({ nullable: true})
  pharmacy?: PharmacyInput;
  @Field({ nullable: true})
  employee?: EmployeeInput;
}
@InputType()
export class HolidayInput {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => EmployeeInput, {nullable: true})
  employee?: EmployeeInput;

  @Field(() => String, {nullable: true})
  from?: string;

  @Field(() => String, {nullable: true})
  until?: string;

  @Field({nullable: true})
  isApproved?: boolean;

  @Field({nullable: true})
  comments?: string;
}

@InputType()
export class RatingInput {
	@Field(() => PatientInput, {nullable: true})
  patient?: PatientInput;

  @Field(() => EmployeeInput, {nullable: true})
  employee?: EmployeeInput;

  @Field(() => PharmacyInput, {nullable: true})
  pharmacy?: PharmacyInput;

  @Field(() => MedicineInput, {nullable: true})
  medicine?: MedicineInput;

  @Field(() => Float,{nullable: true})
  rating?: number;
}
@InputType()
export class SubscriptionInput {
	@Field(() => PatientInput, {nullable: true})
  patient?: PatientInput;

  @Field(() => PharmacyInput, {nullable: true})
  pharmacy?: PharmacyInput;
}



@InputType()
export class PriceInput {
	@Field(() => MedicineItemInput, {nullable: true})
  medicineItem?: MedicineItemInput;

  @Field(() => PharmacyInput, {nullable: true})
  pharmacy?: PharmacyInput;

  @Field({nullable: true})
  price?: number;

  @Field({nullable: true})
  from?: string;
}


@InputType()
export class ComplaintInput {
	@Field(() => PatientInput, {nullable: true})
  patient?: PatientInput;

  @Field(() => EmployeeInput, {nullable: true})
  employee?: EmployeeInput;

  @Field(() => PharmacyInput, {nullable: true})
  pharmacy?: PharmacyInput;

  @Field({nullable: true})
  description?: string;
}

@InputType()
export class ReservationInput {
	@Field(() => PharmacyInput, {nullable:true})
  pharmacy?: PharmacyInput;
	@Field(() => PatientInput, {nullable:true})
  patient?: PatientInput;
	@Field(() => MedicineItemInput, {nullable:true})
  medicineItem: MedicineItemInput;
	@Field(() => String, { nullable: true })
  deadline?: string;
	@Field(() => String, { nullable: true })
  pickupDate?: string;
	@Field({ nullable: true })
  isBought?: boolean;
	@Field(() => String, { nullable: true })
  id?: string;
>>>>>>> dev
}
