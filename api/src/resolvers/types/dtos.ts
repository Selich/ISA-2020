import { Medicine } from "../../entities/Medicine";
import { Pharmacy } from "../../entities/Pharmacy";
import { InputType, Field, ObjectType, Float } from "type-graphql";
import { FieldError } from "./ErrorTypes";
import User from "../../entities/User";
import Patient from "../../entities/Patient";
import {Employee} from "../../entities/Employee";
import { FieldsOnCorrectTypeRule } from "graphql";
import {MedicineItem} from "../../entities/MedicineItem";

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

@ObjectType()
export class PatientResponse {
  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  user?: Patient;

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
  list?: InventoryInput;
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
}
