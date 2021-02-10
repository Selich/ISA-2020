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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  patients?: Maybe<Array<Patient>>;
  tiers?: Maybe<Array<Tier>>;
  appointments?: Maybe<Array<Appointment>>;
  definitions?: Maybe<Array<AppointmentDefinition>>;
  freeExams?: Maybe<Array<Appointment>>;
  appointment?: Maybe<Appointment>;
  holiday?: Maybe<Holiday>;
  employees?: Maybe<Array<Employee>>;
  shop?: Maybe<Array<Medicine>>;
  pharmacies?: Maybe<Array<Pharmacy>>;
  containsMedicine?: Maybe<Array<Pharmacy>>;
};


export type QueryUsersByPharmArgs = {
  role: Scalars['String'];
  pharmId: Scalars['Float'];
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
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
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
  appointments?: Maybe<Array<Appointment>>;
  allergies?: Maybe<Array<Medicine>>;
  prescritions: Array<Prescription>;
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
  type: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  report?: Maybe<Scalars['String']>;
  isVisited?: Maybe<Scalars['Boolean']>;
  begin?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
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
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
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
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  complain: Scalars['String'];
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  employee: Employee;
  pharmacyID: Scalars['Float'];
  from: Scalars['String'];
  until: Scalars['String'];
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

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Float']>;
  form?: Maybe<Scalars['String']>;
  contents?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  isPrescriptionRequired: Scalars['Boolean'];
  info?: Maybe<Scalars['String']>;
  from: Scalars['String'];
  until: Scalars['String'];
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
  medicines: Array<MedicineItem>;
  supplier: Employee;
  pharmacy: Pharmacy;
};

export type MedicineItem = {
  __typename?: 'MedicineItem';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  details: Medicine;
  list: MedicineList;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  dateOfPurchase: Scalars['String'];
  instructions: Scalars['String'];
};

export type MedicineList = {
  __typename?: 'MedicineList';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  type: Scalars['String'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  pharmacy: Pharmacy;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines: Array<MedicineItem>;
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
  patient: Patient;
  pharmacy: Pharmacy;
  description: Scalars['String'];
};

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines: Array<MedicineItem>;
  patient: Patient;
  employee: Employee;
  appointment: Appointment;
  type: Scalars['String'];
  isUsed: Scalars['Boolean'];
  hashCode: Scalars['String'];
  deadline?: Maybe<Scalars['String']>;
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

export type UserDto = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  address?: Maybe<AddressDto>;
  telephone?: Maybe<Scalars['String']>;
};

export type AddressDto = {
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  createEmployee: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  employeeDetails?: Maybe<Employee>;
  addEmployee: EmployeeResponse;
  eprescriptions?: Maybe<Array<EPrescription>>;
  pharmacy?: Maybe<Pharmacy>;
  createPharmacy?: Maybe<Pharmacy>;
};


export type MutationRegisterArgs = {
  inputs: RegisterInput;
};


export type MutationCreateEmployeeArgs = {
  inputs: EmployeeInput;
};


export type MutationLoginArgs = {
  inputs: LoginInput;
};


export type MutationCreateMedicineArgs = {
  inputs: MedicineDetailsInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type EmployeeInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: Scalars['String'];
};


export type MutationAddEmployeeArgs = {
  inputs: AdminInput;
};


export type MutationEprescriptionsArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MedicineResponse = {
  __typename?: 'MedicineResponse';
  errors?: Maybe<Array<FieldErrorMedicine>>;
  details?: Maybe<MedicineDetails>;
};


export type MutationCreatePharmacyArgs = {
  inputs: PharmacyDto;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Patient>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type EmployeeResponse = {
  __typename?: 'EmployeeResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Employee>;
};

export type AdminInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  pharmacyName: Scalars['String'];
  role: Scalars['String'];
};

export type EPrescription = {
  __typename?: 'EPrescription';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient?: Maybe<Patient>;
  hashCode: Scalars['String'];
  dateOfGrant: Scalars['String'];
  status: Scalars['String'];
};

export type PharmacyDto = {
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
};

export type InputExamFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'begin' | 'end' | 'discount'>
  & { employee?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName'>
  )> }
);

export type CreateEmployeeMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: Scalars['String'];
}>;


export type CreateEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { createEmployee: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type AddEmployeeMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  pharmacyName: Scalars['String'];
  role: Scalars['String'];
}>;


export type AddEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { addEmployee: (
    { __typename?: 'EmployeeResponse' }
    & { user?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'email' | 'firstName' | 'lastName' | 'role'>
      & { pharmacy?: Maybe<(
        { __typename?: 'Pharmacy' }
        & Pick<Pharmacy, 'name'>
      )> }
    )> }
  ) }
);

export type ConfirmRegistrationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateMedicineMutation = (
  { __typename?: 'Mutation' }
  & { createMedicine: (
    { __typename?: 'MedicineResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorMedicine' }
      & Pick<FieldErrorMedicine, 'field' | 'message'>
    )>>, details?: Maybe<(
      { __typename?: 'MedicineDetails' }
      & Pick<MedicineDetails, 'name'>
    )> }
  ) }
);

export type CreatePharmacyMutationVariables = Exact<{
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
}>;


export type CreatePharmacyMutation = (
  { __typename?: 'Mutation' }
  & { createPharmacy?: Maybe<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type DermsQueryVariables = Exact<{
  pharmId: Scalars['Float'];
}>;


export type DermsQuery = (
  { __typename?: 'Query' }
  & { usersByPharm?: Maybe<Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>> }
);

export type DefinitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DefinitionsQuery = (
  { __typename?: 'Query' }
  & { definitions?: Maybe<Array<(
    { __typename?: 'AppointmentDefinition' }
    & Pick<AppointmentDefinition, 'type' | 'score' | 'price'>
    & { pharmacy: (
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    ) }
  )>> }
);

export type EmployeeDetailsMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type EmployeeDetailsMutation = (
  { __typename?: 'Mutation' }
  & { employeeDetails?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email' | 'firstName' | 'lastName' | 'role'>
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'id'>
    )> }
  )> }
);

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = (
  { __typename?: 'Query' }
  & { employees?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email' | 'firstName' | 'lastName'>
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
    & RegularUserFragment
  )> }
);

export type MedicinesDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicinesDetailsQuery = (
  { __typename?: 'Query' }
  & { medicinesDetails?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'quantity' | 'price'>
  )>> }
);

export type MedicinesQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicinesQuery = (
  { __typename?: 'Query' }
  & { medicines?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'quantity' | 'price'>
  )>> }
);

export type TiersQueryVariables = Exact<{ [key: string]: never; }>;


export type TiersQuery = (
  { __typename?: 'Query' }
  & { tiers?: Maybe<Array<(
    { __typename?: 'Tier' }
    & Pick<Tier, 'name' | 'discount' | 'scoreMin' | 'scoreMax'>
  )>> }
);

export const InputExamFragmentDoc = gql`
    fragment InputExam on Appointment {
  begin
  end
  discount
  employee {
    firstName
    lastName
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  role
}
    `;
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($email: String!, $firstName: String!, $lastName: String!, $role: String!) {
  createEmployee(
    inputs: {email: $email, firstName: $firstName, lastName: $lastName, role: $role}
  ) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;

export function useCreateEmployeeMutation() {
  return Urql.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument);
};
export const AddEmployeeDocument = gql`
    mutation AddEmployee($email: String!, $password: String!, $firstName: String!, $lastName: String!, $telephone: String!, $street: String!, $city: String!, $country: String!, $pharmacyName: String!, $role: String!) {
  addEmployee(
    inputs: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, telephone: $telephone, street: $street, city: $city, country: $country, pharmacyName: $pharmacyName, role: $role}
  ) {
    user {
      email
      firstName
      lastName
      role
      pharmacy {
        name
      }
    }
  }
}
    `;

export function useAddEmployeeMutation() {
  return Urql.useMutation<AddEmployeeMutation, AddEmployeeMutationVariables>(AddEmployeeDocument);
};
export const ConfirmRegistrationDocument = gql`
    mutation ConfirmRegistration($email: String!) {
  confirmRegistration(email: $email) {
    errors {
      field
      message
    }
    details {
      name
    }
  }
}
    `;

export function useCreateMedicineMutation() {
  return Urql.useMutation<CreateMedicineMutation, CreateMedicineMutationVariables>(CreateMedicineDocument);
};
export const CreatePharmacyDocument = gql`
    mutation createPharmacy($name: String!, $street: String!, $city: String!, $country: String!) {
  createPharmacy(
    inputs: {name: $name, street: $street, city: $city, country: $country}
  ) {
    name
  }
}
    `;

export function useCreatePharmacyMutation() {
  return Urql.useMutation<CreatePharmacyMutation, CreatePharmacyMutationVariables>(CreatePharmacyDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(inputs: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

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
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $confirmPassword: String!) {
  register(
    inputs: {email: $email, password: $password, confirmPassword: $confirmPassword}
  ) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const DermsDocument = gql`
    query Derms($pharmId: Float!) {
  usersByPharm(pharmId: $pharmId, role: "derms") {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useDermsQuery(options: Omit<Urql.UseQueryArgs<DermsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DermsQuery>({ query: DermsDocument, ...options });
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
export const DefinitionsDocument = gql`
    query Definitions {
  definitions {
    type
    score
    price
    pharmacy {
      name
    }
  }
}
    `;

export function useDefinitionsQuery(options: Omit<Urql.UseQueryArgs<DefinitionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DefinitionsQuery>({ query: DefinitionsDocument, ...options });
};
export const EmployeeDetailsDocument = gql`
    mutation EmployeeDetails($email: String!) {
  employeeDetails(inputs: {email: $email}) {
    email
    firstName
    lastName
    role
    pharmacy {
      id
    }
  }
}
    `;

export function useEmployeeDetailsMutation() {
  return Urql.useMutation<EmployeeDetailsMutation, EmployeeDetailsMutationVariables>(EmployeeDetailsDocument);
};
export const EmployeesDocument = gql`
    query Employees {
  employees {
    email
    firstName
    lastName
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
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MedicinesDetailsDocument = gql`
    query MedicinesDetails {
  medicinesDetails {
    id
    quantity
    price
  }
}
    `;

export function useMedicinesDetailsQuery(options: Omit<Urql.UseQueryArgs<MedicinesDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MedicinesDetailsQuery>({ query: MedicinesDetailsDocument, ...options });
};
export const MedicinesDocument = gql`
    query Medicines {
  medicines {
    id
    quantity
    price
  }
}
    `;

export function useMedicinesQuery(options: Omit<Urql.UseQueryArgs<MedicinesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MedicinesQuery>({ query: MedicinesDocument, ...options });
};
export const TiersDocument = gql`
    query Tiers {
  tiers {
    name
    discount
    scoreMin
    scoreMax
  }
}
    `;

export function useTiersQuery(options: Omit<Urql.UseQueryArgs<TiersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TiersQuery>({ query: TiersDocument, ...options });
};