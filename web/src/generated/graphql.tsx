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
  patients?: Maybe<Array<Patient>>;
  me?: Maybe<User>;
  holiday?: Maybe<Holiday>;
  employees?: Maybe<Array<Employee>>;
  eprescriptions?: Maybe<Array<Prescription>>;
};


export type QueryPatientsArgs = {
  inputs: UserDto;
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
  allergies: Array<Medicine>;
  prescritions: Array<Prescription>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  subscriptions: Array<Pharmacy>;
  tier: Tier;
  score: Scalars['Float'];
  penalty: Scalars['Float'];
  isEnabled: Scalars['Boolean'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  form: Scalars['String'];
  contents: Scalars['String'];
  producer: Scalars['String'];
  isPrescriptionRequired: Scalars['Boolean'];
  info: Scalars['String'];
  from: Scalars['String'];
  until: Scalars['String'];
};

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['ID'];
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

export type MedicineItem = {
  __typename?: 'MedicineItem';
  id: Scalars['ID'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines: Array<MedicineItem>;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
  holidays: Array<Holiday>;
  ratings: Array<Rating>;
  workingHours: Array<WorkingHours>;
  requests: Array<MedicineRequest>;
  averageRating: Scalars['Float'];
};

export type Holiday = {
  __typename?: 'Holiday';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  employee: Employee;
  from: Scalars['String'];
  until: Scalars['String'];
  isApproved: Scalars['Boolean'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  complain: Scalars['String'];
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['ID'];
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

export type Pharmacy = {
  __typename?: 'Pharmacy';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  address: Address;
  name: Scalars['String'];
  long: Scalars['Float'];
  lat: Scalars['Float'];
  inventory: Inventory;
  prices: Array<Price>;
  definitions: Array<AppointmentDefinition>;
  requests: Array<MedicineRequest>;
  appointments: Array<Appointment>;
  subscribers: Array<Patient>;
  reservations: Array<Reservation>;
  complaints: Array<Complaint>;
  ratings: Array<Rating>;
};

export type Inventory = {
  __typename?: 'Inventory';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  medicines: Array<MedicineItem>;
  supplier: Employee;
  pharmacy: Pharmacy;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['ID'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  type: Scalars['String'];
  delta: Scalars['Float'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  pharmacy: Pharmacy;
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient: Patient;
  employee: Employee;
  pharmacy: Pharmacy;
  prescription: Prescription;
  type: Scalars['String'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  discount: Scalars['Float'];
  report: Scalars['String'];
  isVisited: Scalars['Boolean'];
  from: Scalars['String'];
  until: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient: Patient;
  pharmacy: Pharmacy;
  description: Scalars['String'];
};

export type Tier = {
  __typename?: 'Tier';
  id: Scalars['ID'];
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  confirmRegistration: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  generateEPrescription?: Maybe<Prescription>;
  readEPrescription?: Maybe<Prescription>;
};


export type MutationRegisterArgs = {
  inputs: RegisterPatientDto;
};


export type MutationConfirmRegistrationArgs = {
  inputs: UserDto;
};


export type MutationLoginArgs = {
  inputs: UserDto;
};


export type MutationGenerateEPrescriptionArgs = {
  inputs: MedicineListDto;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Patient>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterPatientDto = {
  confirmPassword?: Maybe<Scalars['String']>;
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

export type MedicineListDto = {
  list: Array<MedicineItemDto>;
};

export type MedicineItemDto = {
  details: MedicineDto;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  dateOfPurchase: Scalars['String'];
  instructions: Scalars['String'];
};

export type MedicineDto = {
  code: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  form: Scalars['String'];
  contents: Scalars['String'];
  producer: Scalars['String'];
  isPrescriptionRequired: Scalars['Boolean'];
  info: Scalars['String'];
  prices: Array<Scalars['Float']>;
  alternatives: Array<MedicineDto>;
  from: Scalars['String'];
  until: Scalars['String'];
};

export type InputExamFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'from' | 'until' | 'discount'>
  & { employee: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName'>
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'telephone' | 'gender' | 'email'>
  & { address: (
    { __typename?: 'Address' }
    & Pick<Address, 'street' | 'city' | 'country'>
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
    & { user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  inputs: RegisterPatientDto;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email' | 'firstName' | 'lastName'>
    )> }
  ) }
);

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = (
  { __typename?: 'Query' }
  & { employees?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email' | 'firstName' | 'lastName'>
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

export const InputExamFragmentDoc = gql`
    fragment InputExam on Appointment {
  from
  until
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
  address {
    street
    city
    country
  }
  telephone
  gender
  email
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(inputs: {email: $email, password: $password}) {
    user {
      email
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
export const RegisterDocument = gql`
    mutation Register($inputs: RegisterPatientDTO!) {
  register(inputs: $inputs) {
    errors {
      field
      message
    }
    user {
      email
      firstName
      lastName
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
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