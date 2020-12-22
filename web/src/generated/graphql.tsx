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
  test?: Maybe<User>;
  getMyProfile?: Maybe<User>;
  usersByPharm?: Maybe<Array<User>>;
};


export type QueryUsersByPharmArgs = {
  role: Scalars['String'];
  pharmId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  holidays: Array<Holiday>;
  workingHours: Array<WorkingHours>;
  requests: Array<MedicineRequest>;
  details: PatientDetails;
  gender: Scalars['String'];
  dateOfBirth: Scalars['String'];
  address: Address;
  telephone: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  averageRating: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Holiday = {
  __typename?: 'Holiday';
  id: Scalars['ID'];
  employee: User;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['Float'];
  doctorID: User;
  pharmacyID: Scalars['Float'];
  from: Scalars['DateTime'];
  until: Scalars['DateTime'];
};


export type MedicineRequest = {
  __typename?: 'MedicineRequest';
  id: Scalars['ID'];
  medicines: Array<Medicine>;
  pharmacy: Pharmacy;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  details: MedicineDetails;
  list: MedicineList;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MedicineDetails = {
  __typename?: 'MedicineDetails';
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MedicineList = {
  __typename?: 'MedicineList';
  id: Scalars['ID'];
  medicines: Array<Medicine>;
};

export type Pharmacy = {
  __typename?: 'Pharmacy';
  id: Scalars['ID'];
  address: Address;
  long: Scalars['Float'];
  lat: Scalars['Float'];
  requests: Array<MedicineRequest>;
  appointments: Array<Appointment>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
  patient: PatientDetails;
  doctor: User;
  prescription: Prescrition;
};

export type PatientDetails = {
  __typename?: 'PatientDetails';
  id: Scalars['ID'];
  allergies: Array<MedicineDetails>;
  prescritions: Array<Prescrition>;
  reservations: Array<Reservation>;
  ratings: Array<Rating>;
  score: Scalars['Float'];
  penalty: Scalars['Float'];
};

export type Prescrition = {
  __typename?: 'Prescrition';
  id: Scalars['ID'];
  medicines: Array<Medicine>;
  isUsed: Scalars['Boolean'];
  deadline: Scalars['DateTime'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
  medicines: Array<Medicine>;
  pharmacy: Pharmacy;
  deadline: Scalars['String'];
  pickupDate: Scalars['String'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  complain: Scalars['String'];
  score: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  inputs: RegisterInput;
};


export type MutationLoginArgs = {
  inputs: LoginInput;
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  gender: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  dateOfBirth: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'role'>
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  telephone: Scalars['String'];
  dateOfBirth: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
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
      & RegularUserFragment
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

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  role
}
    `;
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
    mutation Register($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!, $gender: String!, $telephone: String!, $dateOfBirth: String!, $street: String!, $city: String!, $country: String!) {
  register(
    inputs: {email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName, dateOfBirth: $dateOfBirth, gender: $gender, telephone: $telephone, street: $street, city: $city, country: $country}
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