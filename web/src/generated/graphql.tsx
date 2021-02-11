import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  patients?: Maybe<Array<Patient>>;
  tiers?: Maybe<Array<Tier>>;
  appointments?: Maybe<Array<Appointment>>;
  definitions?: Maybe<Array<AppointmentDefinition>>;
  available?: Maybe<Array<Appointment>>;
  appointment?: Maybe<Appointment>;
  employees?: Maybe<Array<Employee>>;
  holidays?: Maybe<Array<Holiday>>;
  shop?: Maybe<Array<Medicine>>;
  pharmacyMedicine?: Maybe<Array<Pharmacy>>;
  pharmacies?: Maybe<Array<Pharmacy>>;
  containsMedicine?: Maybe<Array<Pharmacy>>;
};


export type QueryPatientsArgs = {
  inputs: PatientInput;
};


export type QueryAvailableArgs = {
  id: Scalars['String'];
};


export type QueryAppointmentArgs = {
  date: Scalars['String'];
};


export type QueryPharmacyMedicineArgs = {
  inputs: MedicineInput;
};


export type QueryContainsMedicineArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address: Address;
  telephone: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address: Address;
  telephone: Scalars['String'];
  appointments?: Maybe<Array<Appointment>>;
  allergies?: Maybe<Array<Medicine>>;
  prescritions: Array<Prescription>;
  ePrescriptions: Array<EPrescription>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  subscriptions?: Maybe<Array<Pharmacy>>;
  tier?: Maybe<Tier>;
  score?: Maybe<Scalars['Float']>;
  penalty?: Maybe<Scalars['Float']>;
  isEnabled: Scalars['Boolean'];
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient: Patient;
  employee?: Maybe<Employee>;
  pharmacy?: Maybe<Pharmacy>;
  prescription?: Maybe<Prescription>;
  kind: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  report?: Maybe<Scalars['String']>;
  isVisited?: Maybe<Scalars['Boolean']>;
  begin?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Float']>;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address: Address;
  telephone: Scalars['String'];
  holidays: Array<Holiday>;
  ratings: Array<Rating>;
  workingHours: Array<WorkingHours>;
  requests: Array<MedicineRequest>;
  pharmacy?: Maybe<Pharmacy>;
  averageRating: Scalars['Float'];
};

export type Holiday = {
  __typename?: 'Holiday';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  employee?: Maybe<Employee>;
  from: Scalars['String'];
  until: Scalars['String'];
  isApproved: Scalars['Boolean'];
  comments: Scalars['String'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  rating?: Maybe<Scalars['Float']>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  employee: Employee;
  pharmacy: Pharmacy;
  from?: Maybe<Scalars['String']>;
  until?: Maybe<Scalars['String']>;
};

export type Pharmacy = {
  __typename?: 'Pharmacy';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  address?: Maybe<Address>;
  name: Scalars['String'];
  long?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  inventory: Inventory;
  prices: Array<Price>;
  admins: Array<Employee>;
  definitions: Array<AppointmentDefinition>;
  requests: Array<MedicineRequest>;
  appointments: Array<Appointment>;
  subscribers: Array<Patient>;
  reservations: Array<Reservation>;
  complaints: Array<Complaint>;
  ratings: Array<Rating>;
  averageRating?: Maybe<Scalars['Float']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines?: Maybe<Array<MedicineItem>>;
  supplier: Employee;
  pharmacy: Pharmacy;
};

export type MedicineItem = {
  __typename?: 'MedicineItem';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  details?: Maybe<Medicine>;
  list: MedicineList;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  dateOfPurchase?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Float']>;
  form?: Maybe<Scalars['String']>;
  contents?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  isPrescriptionRequired?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  ratings: Array<Rating>;
  from: Scalars['String'];
  until: Scalars['String'];
};

export type MedicineList = {
  __typename?: 'MedicineList';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines?: Maybe<Array<MedicineItem>>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  pharmacy: Pharmacy;
  medicine: Medicine;
  price: Scalars['Float'];
  from: Scalars['String'];
};

export type AppointmentDefinition = {
  __typename?: 'AppointmentDefinition';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  kind: Scalars['String'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  pharmacy: Pharmacy;
};

export type MedicineRequest = {
  __typename?: 'MedicineRequest';
  id: Scalars['ID'];
  medicine: Medicine;
  pharmacy: Pharmacy;
  employee: Employee;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines?: Maybe<Array<MedicineItem>>;
  pharmacy: Pharmacy;
  deadline: Scalars['String'];
  pickupDate: Scalars['String'];
  isBought: Scalars['Boolean'];
  totalSum: Scalars['Float'];
};

export type Complaint = {
  __typename?: 'Complaint';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient?: Maybe<Patient>;
  employee?: Maybe<Employee>;
  pharmacy?: Maybe<Pharmacy>;
  description?: Maybe<Scalars['String']>;
};

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines?: Maybe<Array<MedicineItem>>;
  patient: Patient;
  employee: Employee;
  appointment: Appointment;
  type: Scalars['String'];
  isUsed: Scalars['Boolean'];
  hashCode: Scalars['String'];
  deadline?: Maybe<Scalars['String']>;
};

export type EPrescription = {
  __typename?: 'EPrescription';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient?: Maybe<Patient>;
  pharmacy?: Maybe<Pharmacy>;
  hashCode: Scalars['String'];
  dateOfGrant: Scalars['String'];
  status: Scalars['String'];
};

export type Tier = {
  __typename?: 'Tier';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  discount: Scalars['Float'];
  scoreMin: Scalars['Float'];
  scoreMax: Scalars['Float'];
  patients: Array<Patient>;
};

export type PatientInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  telephone?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  penalty?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type MedicineInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Float']>;
  form?: Maybe<Scalars['String']>;
  contents?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  isPrescriptionRequired?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAllergie?: Maybe<Patient>;
  addRating?: Maybe<Rating>;
  addComplaint?: Maybe<Complaint>;
  subscribe?: Maybe<Patient>;
  register: PatientResponse;
  confirmRegistration: PatientResponse;
  login: UserResponse;
  updateProfile: PatientResponse;
  logout: Scalars['Boolean'];
  createDefinition?: Maybe<AppointmentDefinition>;
  schedule?: Maybe<Appointment>;
  addFreeApp?: Maybe<Appointment>;
  requestHoliday?: Maybe<Holiday>;
  approveHoliday?: Maybe<Holiday>;
  addWorkingHours?: Maybe<Employee>;
  addEmployee: EmployeeResponse;
  reserveMedicine?: Maybe<Array<Reservation>>;
  cancelReservation?: Maybe<Array<Reservation>>;
  pickupReservation?: Maybe<Array<Reservation>>;
  createMedicine?: Maybe<Medicine>;
  addMedicine?: Maybe<MedicineItem>;
  eprescriptions?: Maybe<Array<EPrescription>>;
  pharmacy?: Maybe<Pharmacy>;
  createPharmacy?: Maybe<Pharmacy>;
  removePharmacy?: Maybe<Pharmacy>;
};


export type MutationAddAllergieArgs = {
  allergies: Scalars['String'];
};


export type MutationAddRatingArgs = {
  inputs: RatingInput;
};


export type MutationAddComplaintArgs = {
  inputs: ComplaintInput;
};


export type MutationSubscribeArgs = {
  inputs: SubscriptionInput;
};


export type MutationRegisterArgs = {
  country: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  telephone: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationConfirmRegistrationArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  inputs: PatientInput;
};


export type MutationUpdateProfileArgs = {
  country: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  telephone: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateDefinitionArgs = {
  inputs: AppointmentInput;
};


export type MutationScheduleArgs = {
  inputs: AppointmentInput;
};


export type MutationAddFreeAppArgs = {
  employee: Scalars['String'];
  discount: Scalars['Float'];
  length: Scalars['Float'];
  from: Scalars['String'];
};


export type MutationRequestHolidayArgs = {
  inputs: HolidayInput;
};


export type MutationApproveHolidayArgs = {
  inputs: HolidayInput;
};


export type MutationAddWorkingHoursArgs = {
  inputs: WorkingHoursInput;
};


export type MutationAddEmployeeArgs = {
  inputs: EmployeeInput;
};


export type MutationCreateMedicineArgs = {
  inputs: MedicineInput;
};


export type MutationAddMedicineArgs = {
  inputs: MedicineItemInput;
};


export type MutationEprescriptionsArgs = {
  email: Scalars['String'];
};


export type MutationPharmacyArgs = {
  id: Scalars['String'];
};


export type MutationCreatePharmacyArgs = {
  inputs: PharmacyInput;
};


export type MutationRemovePharmacyArgs = {
  inputs: PharmacyInput;
};

export type RatingInput = {
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  medicine?: Maybe<MedicineInput>;
  rating?: Maybe<Scalars['Float']>;
};

export type EmployeeInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  telephone?: Maybe<Scalars['String']>;
  pharmacy?: Maybe<Scalars['String']>;
  averageRating?: Maybe<Scalars['String']>;
  workingHours?: Maybe<Array<WorkingHoursInput>>;
};

export type WorkingHoursInput = {
  until?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  pharmacy?: Maybe<PharmacyInput>;
  employee?: Maybe<EmployeeInput>;
};

export type PharmacyInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
};

export type ComplaintInput = {
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  description?: Maybe<Scalars['String']>;
};

export type SubscriptionInput = {
  patient?: Maybe<PatientInput>;
  pharmacy?: Maybe<PharmacyInput>;
};

export type PatientResponse = {
  __typename?: 'PatientResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Patient>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Patient>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};

export type AppointmentInput = {
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  kind?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  report?: Maybe<Scalars['String']>;
  isVisited?: Maybe<Scalars['String']>;
  begin?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Float']>;
};

export type HolidayInput = {
  id?: Maybe<Scalars['String']>;
  employee?: Maybe<EmployeeInput>;
  from?: Maybe<Scalars['String']>;
  until?: Maybe<Scalars['String']>;
  isApproved?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<Scalars['String']>;
};

export type EmployeeResponse = {
  __typename?: 'EmployeeResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type MedicineItemInput = {
  name?: Maybe<Scalars['String']>;
  details?: Maybe<MedicineInput>;
  list: MedicineListInput;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  dateOfPurchase?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
};

export type MedicineListInput = {
  medicines?: Maybe<Array<MedicineItemInput>>;
  id?: Maybe<Scalars['String']>;
  pharmacy?: Maybe<PharmacyInput>;
};

export type InputExamFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'begin' | 'length' | 'discount'>
  & { employee?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName'>
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'email'>
);

export type AddAllergieMutationVariables = Exact<{
  allergies: Scalars['String'];
}>;


export type AddAllergieMutation = (
  { __typename?: 'Mutation' }
  & { addAllergie?: Maybe<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'email' | 'firstName' | 'lastName' | 'role'>
    & { allergies?: Maybe<Array<(
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'name'>
    )>>, tier?: Maybe<(
      { __typename?: 'Tier' }
      & Pick<Tier, 'name' | 'discount'>
    )>, appointments?: Maybe<Array<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'begin' | 'length' | 'kind' | 'isVisited' | 'price'>
      & { employee?: Maybe<(
        { __typename?: 'Employee' }
        & Pick<Employee, 'firstName' | 'lastName' | 'email' | 'averageRating'>
      )>, pharmacy?: Maybe<(
        { __typename?: 'Pharmacy' }
        & Pick<Pharmacy, 'name'>
      )> }
    )>> }
  )> }
);

export type AddFreeAppMutationVariables = Exact<{
  from: Scalars['String'];
  length: Scalars['Float'];
  employee: Scalars['String'];
  discount: Scalars['Float'];
}>;


export type AddFreeAppMutation = (
  { __typename?: 'Mutation' }
  & { addFreeApp?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'email' | 'firstName' | 'lastName'>
    )> }
  )> }
);

export type ConfirmRegistrationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ConfirmRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { confirmRegistration: (
    { __typename?: 'PatientResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email' | 'firstName' | 'lastName' | 'role' | 'penalty' | 'score'>
      & { subscriptions?: Maybe<Array<(
        { __typename?: 'Pharmacy' }
        & Pick<Pharmacy, 'name'>
      )>> }
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PharmacyMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type PharmacyMutation = (
  { __typename?: 'Mutation' }
  & { pharmacy?: Maybe<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name' | 'lat' | 'long'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'PatientResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )> }
  ) }
);

export type ScheduleMutationVariables = Exact<{
  patient: Scalars['String'];
  employee: Scalars['String'];
}>;


export type ScheduleMutation = (
  { __typename?: 'Mutation' }
  & { schedule?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { patient: (
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    ), employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'email'>
    )> }
  )> }
);

export type SubscribeMutationVariables = Exact<{
  inputs: SubscriptionInput;
}>;


export type SubscribeMutation = (
  { __typename?: 'Mutation' }
  & { subscribe?: Maybe<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'email'>
  )> }
);

export type AvailableQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AvailableQuery = (
  { __typename?: 'Query' }
  & { available?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName' | 'email' | 'averageRating'>
    )> }
  )>> }
);

export type ContainsMedicineQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContainsMedicineQuery = (
  { __typename?: 'Query' }
  & { containsMedicine?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name' | 'long' | 'lat'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    )> }
  )>> }
);

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = (
  { __typename?: 'Query' }
  & { employees?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email' | 'firstName' | 'lastName' | 'averageRating'>
    & { holidays: Array<(
      { __typename?: 'Holiday' }
      & Pick<Holiday, 'from' | 'until'>
    )>, workingHours: Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )> }
  )>> }
);

export type EprescriptionsMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type EprescriptionsMutation = (
  { __typename?: 'Mutation' }
  & { eprescriptions?: Maybe<Array<(
    { __typename?: 'EPrescription' }
    & Pick<EPrescription, 'id' | 'hashCode' | 'dateOfGrant' | 'status'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'role' | 'email'>
  )> }
);

export type PharmaciesQueryVariables = Exact<{ [key: string]: never; }>;


export type PharmaciesQuery = (
  { __typename?: 'Query' }
  & { pharmacies?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'id' | 'name' | 'long' | 'lat' | 'averageRating'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    )> }
  )>> }
);

export type ShopQueryVariables = Exact<{ [key: string]: never; }>;


export type ShopQuery = (
  { __typename?: 'Query' }
  & { shop?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'code' | 'name' | 'kind' | 'points' | 'form' | 'rating' | 'contents' | 'producer' | 'isPrescriptionRequired' | 'info'>
  )>> }
);

export const InputExamFragmentDoc = gql`
    fragment InputExam on Appointment {
  begin
  length
  discount
  employee {
    firstName
    lastName
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  firstName
  lastName
  email
}
    `;
export const AddAllergieDocument = gql`
    mutation AddAllergie($allergies: String!) {
  addAllergie(allergies: $allergies) {
    email
    firstName
    lastName
    role
    allergies {
      name
    }
    tier {
      name
      discount
    }
    appointments {
      employee {
        firstName
        lastName
        email
        averageRating
      }
      begin
      length
      kind
      isVisited
      price
      pharmacy {
        name
      }
    }
  }
}
    `;

export function useAddAllergieMutation() {
  return Urql.useMutation<AddAllergieMutation, AddAllergieMutationVariables>(AddAllergieDocument);
};
export const AddFreeAppDocument = gql`
    mutation AddFreeApp($from: String!, $length: Float!, $employee: String!, $discount: Float!) {
  addFreeApp(
    from: $from
    length: $length
    employee: $employee
    discount: $discount
  ) {
    begin
    length
    employee {
      email
      firstName
      lastName
    }
  }
}
    `;

export function useAddFreeAppMutation() {
  return Urql.useMutation<AddFreeAppMutation, AddFreeAppMutationVariables>(AddFreeAppDocument);
};
export const ConfirmRegistrationDocument = gql`
    mutation ConfirmRegistration($email: String!) {
  confirmRegistration(email: $email) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `;

export function useConfirmRegistrationMutation() {
  return Urql.useMutation<ConfirmRegistrationMutation, ConfirmRegistrationMutationVariables>(ConfirmRegistrationDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(inputs: {email: $email, password: $password}) {
    token
    user {
      email
      firstName
      lastName
      role
      subscriptions {
        name
      }
      penalty
      score
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PharmacyDocument = gql`
    mutation Pharmacy($id: String!) {
  pharmacy(id: $id) {
    name
    lat
    long
    address {
      street
      city
      country
    }
  }
}
    `;

export function usePharmacyMutation() {
  return Urql.useMutation<PharmacyMutation, PharmacyMutationVariables>(PharmacyDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!, $telephone: String!, $street: String!, $city: String!, $country: String!) {
  register(
    email: $email
    password: $password
    confirmPassword: $confirmPassword
    firstName: $firstName
    lastName: $lastName
    telephone: $telephone
    street: $street
    city: $city
    country: $country
  ) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ScheduleDocument = gql`
    mutation Schedule($patient: String!, $employee: String!) {
  schedule(inputs: {patient: {email: $patient}, employee: {email: $employee}}) {
    begin
    length
    patient {
      email
    }
    employee {
      email
    }
  }
}
    `;

export function useScheduleMutation() {
  return Urql.useMutation<ScheduleMutation, ScheduleMutationVariables>(ScheduleDocument);
};
export const SubscribeDocument = gql`
    mutation subscribe($inputs: SubscriptionInput!) {
  subscribe(inputs: $inputs) {
    email
  }
}
    `;

export function useSubscribeMutation() {
  return Urql.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument);
};
export const AvailableDocument = gql`
    query Available($id: String!) {
  available(id: $id) {
    begin
    length
    employee {
      firstName
      lastName
      email
      averageRating
    }
  }
}
    `;

export function useAvailableQuery(options: Omit<Urql.UseQueryArgs<AvailableQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AvailableQuery>({ query: AvailableDocument, ...options });
};
export const ContainsMedicineDocument = gql`
    query ContainsMedicine($id: String!) {
  containsMedicine(id: $id) {
    name
    address {
      street
      city
      country
    }
    long
    lat
  }
}
    `;

export function useContainsMedicineQuery(options: Omit<Urql.UseQueryArgs<ContainsMedicineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ContainsMedicineQuery>({ query: ContainsMedicineDocument, ...options });
};
export const EmployeesDocument = gql`
    query Employees {
  employees {
    email
    firstName
    lastName
    holidays {
      from
      until
    }
    workingHours {
      from
      until
    }
    pharmacy {
      name
    }
    averageRating
  }
}
    `;

export function useEmployeesQuery(options: Omit<Urql.UseQueryArgs<EmployeesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmployeesQuery>({ query: EmployeesDocument, ...options });
};
export const EprescriptionsDocument = gql`
    mutation Eprescriptions($email: String!) {
  eprescriptions(email: $email) {
    id
    patient {
      firstName
      lastName
    }
    hashCode
    dateOfGrant
    status
  }
}
    `;

export function useEprescriptionsMutation() {
  return Urql.useMutation<EprescriptionsMutation, EprescriptionsMutationVariables>(EprescriptionsDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    firstName
    lastName
    role
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PharmaciesDocument = gql`
    query Pharmacies {
  pharmacies {
    id
    name
    long
    lat
    address {
      street
      city
      country
    }
    averageRating
  }
}
    `;

export function usePharmaciesQuery(options: Omit<Urql.UseQueryArgs<PharmaciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PharmaciesQuery>({ query: PharmaciesDocument, ...options });
};
export const ShopDocument = gql`
    query Shop {
  shop {
    code
    name
    kind
    points
    form
    rating
    contents
    producer
    isPrescriptionRequired
    info
  }
}
    `;

export function useShopQuery(options: Omit<Urql.UseQueryArgs<ShopQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShopQuery>({ query: ShopDocument, ...options });
};