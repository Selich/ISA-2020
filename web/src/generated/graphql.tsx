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
  appointments?: Maybe<Array<Appointment>>;
  freeExams?: Maybe<Array<Appointment>>;
  appointment?: Maybe<Appointment>;
  holiday?: Maybe<Holiday>;
  employees?: Maybe<Array<Employee>>;
  shop?: Maybe<Array<Medicine>>;
  pharmacies?: Maybe<Array<Pharmacy>>;
  containsMedicine?: Maybe<Array<Pharmacy>>;
};


export type QueryPatientsArgs = {
  inputs: UserDto;
};


export type QueryFreeExamsArgs = {
  pharm: Scalars['Float'];
};


export type QueryAppointmentArgs = {
  date: Scalars['DateTime'];
};


export type QueryContainsMedicineArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
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

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['ID'];
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
  appointments: Array<Appointment>;
  allergies: Array<Medicine>;
  prescritions: Array<Prescription>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  subscriptions: Array<Pharmacy>;
  tier?: Maybe<Tier>;
  score: Scalars['Float'];
  penalty: Scalars['Float'];
  isEnabled: Scalars['Boolean'];
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
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

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  address: Address;
  name: Scalars['String'];
  long: Scalars['String'];
  lat: Scalars['String'];
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


export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  confirmRegistration: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateProfile: UserResponse;
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
  inputs: UserDto;
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

export type InputExamFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'begin' | 'end' | 'discount'>
  & { employee?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName'>
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'email'>
);

export type ConfirmRegistrationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ConfirmRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { confirmRegistration: (
    { __typename?: 'UserResponse' }
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
    & { user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email' | 'firstName' | 'lastName' | 'role'>
      & { allergies: Array<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'name'>
      )>, tier?: Maybe<(
        { __typename?: 'Tier' }
        & Pick<Tier, 'name' | 'discount'>
      )>, appointments: Array<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'begin' | 'end' | 'type' | 'isVisited' | 'price'>
        & { employee?: Maybe<(
          { __typename?: 'Employee' }
          & Pick<Employee, 'firstName' | 'lastName' | 'email' | 'averageRating'>
        )>, pharmacy?: Maybe<(
          { __typename?: 'Pharmacy' }
          & Pick<Pharmacy, 'name'>
        )> }
      )> }
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
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email' | 'firstName' | 'lastName' | 'role'>
      & { tier?: Maybe<(
        { __typename?: 'Tier' }
        & Pick<Tier, 'name' | 'discount'>
      )>, appointments: Array<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'begin' | 'end' | 'type' | 'isVisited' | 'price'>
        & { employee?: Maybe<(
          { __typename?: 'Employee' }
          & Pick<Employee, 'firstName' | 'lastName' | 'email' | 'averageRating'>
        )>, pharmacy?: Maybe<(
          { __typename?: 'Pharmacy' }
          & Pick<Pharmacy, 'name'>
        )> }
      )> }
    )> }
  ) }
);

export type ContainsMedicineQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContainsMedicineQuery = (
  { __typename?: 'Query' }
  & { containsMedicine?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name' | 'long' | 'lat'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    ) }
  )>> }
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
    & Pick<User, 'role' | 'email'>
  )> }
);

export type PharmaciesQueryVariables = Exact<{ [key: string]: never; }>;


export type PharmaciesQuery = (
  { __typename?: 'Query' }
  & { pharmacies?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'id' | 'name' | 'long' | 'lat'>
  )>> }
);

export type ShopQueryVariables = Exact<{ [key: string]: never; }>;


export type ShopQuery = (
  { __typename?: 'Query' }
  & { shop?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'code' | 'name' | 'type' | 'points' | 'form' | 'rating' | 'contents' | 'producer' | 'isPrescriptionRequired' | 'info'>
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
  firstName
  lastName
  email
}
    `;
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
    user {
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
        end
        type
        isVisited
        price
        pharmacy {
          name
        }
      }
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
      firstName
      lastName
      tier {
        name
        discount
      }
      role
      appointments {
        employee {
          firstName
          lastName
          email
          averageRating
        }
        begin
        end
        type
        isVisited
        price
        pharmacy {
          name
        }
      }
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
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
  }
}
    `;

export function useEmployeesQuery(options: Omit<Urql.UseQueryArgs<EmployeesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmployeesQuery>({ query: EmployeesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
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
    type
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