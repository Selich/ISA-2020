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
  usersByPharm?: Maybe<Array<User>>;
  holiday?: Maybe<Holiday>;
  appointmentsInInterval?: Maybe<OutputDermExam>;
  getAppointmentsByPatient?: Maybe<Appointment>;
  appointments?: Maybe<Array<Appointment>>;
  appointment?: Maybe<Appointment>;
  getPatientsByLoggedIn?: Maybe<User>;
  getPharmByDate?: Maybe<Appointment>;
  medicines?: Maybe<Array<Medicine>>;
  pharmacies?: Maybe<Array<Pharmacy>>;
  appointmentDefinitions?: Maybe<Array<AppointmentDefinition>>;
};


export type QueryUsersByPharmArgs = {
  role: Scalars['String'];
  pharmId: Scalars['Float'];
};


export type QueryAppointmentsInIntervalArgs = {
  inputs: GetDermExam;
};


export type QueryGetAppointmentsByPatientArgs = {
  id: Scalars['Int'];
};


export type QueryAppointmentArgs = {
  date: Scalars['DateTime'];
};


export type QueryGetPharmByDateArgs = {
  from: Scalars['DateTime'];
};


export type QueryPharmaciesArgs = {
  quantity: Scalars['Float'];
  medicineItemID: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  holidays: Array<Holiday>;
  ratings: Array<Rating>;
  workingHours: Array<WorkingHours>;
  requests: Array<MedicineRequest>;
  details: PatientDetails;
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  averageRating: Scalars['Float'];
};

export type Holiday = {
  __typename?: 'Holiday';
  id: Scalars['ID'];
  employee: User;
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  complain: Scalars['String'];
  score: Scalars['Float'];
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['Float'];
  doctor: User;
  pharmacyID: Scalars['Float'];
  from: Scalars['String'];
  until: Scalars['String'];
};

export type MedicineRequest = {
  __typename?: 'MedicineRequest';
  id: Scalars['ID'];
  medicine: Medicine;
  pharmacy: Pharmacy;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  form: Scalars['String'];
  contents: Scalars['String'];
  producer: Scalars['String'];
  isPrescriptionRequired: Scalars['Boolean'];
  info: Scalars['String'];
  alternatives: Array<Medicine>;
  from: Scalars['String'];
  until: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Pharmacy = {
  __typename?: 'Pharmacy';
  id: Scalars['ID'];
  address: Address;
  name: Scalars['String'];
  long: Scalars['Float'];
  lat: Scalars['Float'];
  inventory: Inventory;
  prices: Array<Price>;
  requests: Array<MedicineRequest>;
  appointments: Array<Appointment>;
  reservations: Array<Reservation>;
  complaints: Array<Complaint>;
  ratings: Array<Rating>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
};

export type Inventory = {
  __typename?: 'Inventory';
  id: Scalars['ID'];
  medicines: Array<MedicineItem>;
  supplier: User;
  pharmacy: Pharmacy;
};

export type MedicineItem = {
  __typename?: 'MedicineItem';
  id: Scalars['ID'];
  details: Medicine;
  list: MedicineList;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  instructions: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MedicineList = {
  __typename?: 'MedicineList';
  id: Scalars['ID'];
  medicines: Array<MedicineItem>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['ID'];
  pharmacy: Pharmacy;
  medicine: Medicine;
  price: Scalars['Float'];
  from: Scalars['String'];
  until: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
  patient: PatientDetails;
  doctor: User;
  pharmacy: User;
  prescription: Prescrition;
  type: Scalars['String'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  discount: Scalars['Float'];
  report: Scalars['String'];
  isVisited: Scalars['Boolean'];
  from: Scalars['String'];
  until: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PatientDetails = {
  __typename?: 'PatientDetails';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  allergies: Array<Medicine>;
  prescritions: Array<Prescrition>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  tier: Tier;
  score: Scalars['Float'];
  penalty: Scalars['Float'];
};

export type Prescrition = {
  __typename?: 'Prescrition';
  id: Scalars['ID'];
  medicines: Array<MedicineItem>;
  isUsed: Scalars['Boolean'];
  hashCode: Scalars['String'];
  deadline: Scalars['DateTime'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
  medicines: Array<MedicineItem>;
  pharmacy: Pharmacy;
  deadline: Scalars['String'];
  pickupDate: Scalars['String'];
};

export type Tier = {
  __typename?: 'Tier';
  name: Scalars['String'];
  discount: Scalars['Float'];
  score: Scalars['Float'];
  patients: Array<PatientDetails>;
};

export type Complaint = {
  __typename?: 'Complaint';
  id: Scalars['ID'];
  patient: PatientDetails;
  pharmacy: Pharmacy;
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OutputDermExam = {
  __typename?: 'OutputDermExam';
  appointments: Array<Appointment>;
  onVacation: Scalars['Boolean'];
};

export type GetDermExam = {
  from: Scalars['String'];
  doctor: DoctorDto;
};

export type DoctorDto = {
  id?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type AppointmentDefinition = {
  __typename?: 'AppointmentDefinition';
  id: Scalars['ID'];
  type: Scalars['String'];
  delta: Scalars['Float'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  from: Scalars['DateTime'];
  until: Scalars['DateTime'];
  pharmacyId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateProfile: UserResponse;
  changePass: UserResponse;
  createEmployee: UserResponse;
  updateEmployee: Holiday;
  scheduleConsultation?: Maybe<Appointment>;
  scheduleExam?: Maybe<Appointment>;
  createExam?: Maybe<Appointment>;
  create: Holiday;
  createHolidays: Holiday;
  update: Holiday;
  createAppointmentDefinition?: Maybe<Array<AppointmentDefinition>>;
};


export type MutationRegisterArgs = {
  inputs: UserDto;
};


export type MutationLoginArgs = {
  inputs: UserDto;
};


export type MutationUpdateProfileArgs = {
  inputs: LoginInput;
};


export type MutationChangePassArgs = {
  inputs: LoginInput;
};


export type MutationCreateEmployeeArgs = {
  inputs: EmployeeInput;
};


export type MutationUpdateEmployeeArgs = {
  input: EmployeeInput;
};


export type MutationScheduleConsultationArgs = {
  inputs: UserConsulation;
};


export type MutationScheduleExamArgs = {
  inputs: AppointmentDto;
};


export type MutationCreateExamArgs = {
  inputs: AdminExam;
};


export type MutationCreateHolidaysArgs = {
  inputs: HolidayInput;
};


export type MutationCreateAppointmentDefinitionArgs = {
  inputs: AppointmentDefinitionDto;
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

export type UserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  address?: Maybe<AddressDto>;
  role?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
};

export type AddressDto = {
  street?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EmployeeInput = {
  id: Scalars['Float'];
  email: Scalars['String'];
  role: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  gender: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  dateOfBirth: Scalars['String'];
};

export type UserConsulation = {
  from: Scalars['DateTime'];
  pharmacy: PharmDto;
};

export type PharmDto = {
  id: Scalars['Float'];
  name: Scalars['String'];
  rating: Scalars['Float'];
};

export type AppointmentDto = {
  id: Scalars['Float'];
  from: Scalars['String'];
  until: Scalars['String'];
  type: Scalars['String'];
  price: Scalars['Float'];
};

export type AdminExam = {
  from: Scalars['String'];
  until: Scalars['String'];
  discount: Scalars['Float'];
  doctor: DoctorDto;
  pharmacy: PharmacyDto;
};

export type PharmacyDto = {
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  address?: Maybe<AddressDto>;
  long?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
};

export type HolidayInput = {
  employeeId: Scalars['Float'];
  from: Scalars['String'];
  until: Scalars['String'];
};

export type AppointmentDefinitionDto = {
  id: Scalars['ID'];
  type: Scalars['String'];
  score: Scalars['Float'];
  price: Scalars['Float'];
  from: Scalars['DateTime'];
  until: Scalars['DateTime'];
  pharmacyId: Scalars['Float'];
};

export type InputExamFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'from' | 'until' | 'discount'>
  & { doctor: (
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName'>
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'telephone' | 'gender' | 'email' | 'role'>
  & { address: (
    { __typename?: 'Address' }
    & Pick<Address, 'street' | 'city' | 'country'>
  ) }
);

export type CreateExamMutationVariables = Exact<{
  inputs: AdminExam;
}>;


export type CreateExamMutation = (
  { __typename?: 'Mutation' }
  & { createExam?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'from' | 'until'>
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
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
      & { address: (
        { __typename?: 'Address' }
        & Pick<Address, 'street'>
      ) }
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  inputs: UserDto;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  )> }
);

export type AppointmentsInIntervalQueryVariables = Exact<{
  inputs: GetDermExam;
}>;


export type AppointmentsInIntervalQuery = (
  { __typename?: 'Query' }
  & { appointmentsInInterval?: Maybe<(
    { __typename?: 'OutputDermExam' }
    & Pick<OutputDermExam, 'onVacation'>
    & { appointments: Array<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id'>
    )> }
  )> }
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PharmsQueryVariables = Exact<{
  pharmId: Scalars['Float'];
}>;


export type PharmsQuery = (
  { __typename?: 'Query' }
  & { usersByPharm?: Maybe<Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>> }
);

export const InputExamFragmentDoc = gql`
    fragment InputExam on Appointment {
  from
  until
  discount
  doctor {
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
  role
}
    `;
export const CreateExamDocument = gql`
    mutation CreateExam($inputs: AdminExam!) {
  createExam(inputs: $inputs) {
    from
    until
  }
}
    `;

export function useCreateExamMutation() {
  return Urql.useMutation<CreateExamMutation, CreateExamMutationVariables>(CreateExamDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(inputs: {email: "work@gmail.com", password: "1234"}) {
    user {
      email
      address {
        street
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
    mutation Register($inputs: UserDTO!) {
  register(inputs: $inputs) {
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
export const AppointmentsInIntervalDocument = gql`
    query AppointmentsInInterval($inputs: GetDermExam!) {
  appointmentsInInterval(inputs: $inputs) {
    appointments {
      id
    }
    onVacation
  }
}
    `;

export function useAppointmentsInIntervalQuery(options: Omit<Urql.UseQueryArgs<AppointmentsInIntervalQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentsInIntervalQuery>({ query: AppointmentsInIntervalDocument, ...options });
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
export const PharmsDocument = gql`
    query Pharms($pharmId: Float!) {
  usersByPharm(pharmId: $pharmId, role: "pharm") {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function usePharmsQuery(options: Omit<Urql.UseQueryArgs<PharmsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PharmsQuery>({ query: PharmsDocument, ...options });
};