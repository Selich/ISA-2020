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
  derms?: Maybe<Array<User>>;
  pharms?: Maybe<Array<User>>;
  medicines?: Maybe<Array<Medicine>>;
  medicinesDetails?: Maybe<Array<Medicine>>;
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
  gender: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  telephone: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  averageRating: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['Float'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  createEmployee: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createMedicine: MedicineResponse;
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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MedicineResponse = {
  __typename?: 'MedicineResponse';
  errors?: Maybe<Array<FieldErrorMedicine>>;
  details?: Maybe<MedicineDetails>;
};

export type FieldErrorMedicine = {
  __typename?: 'FieldErrorMedicine';
  field: Scalars['String'];
  message: Scalars['String'];
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

export type MedicineDetailsInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  form: Scalars['String'];
  contents: Scalars['String'];
  producer: Scalars['String'];
  info: Scalars['String'];
};

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

export type CreateMedicineMutationVariables = Exact<{
  code: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  form: Scalars['String'];
  contents: Scalars['String'];
  producer: Scalars['String'];
  info: Scalars['String'];
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
export const CreateMedicineDocument = gql`
    mutation CreateMedicine($code: String!, $name: String!, $type: String!, $points: Float!, $form: String!, $contents: String!, $producer: String!, $info: String!) {
  createMedicine(
    inputs: {code: $code, name: $name, type: $type, points: $points, form: $form, contents: $contents, producer: $producer, info: $info}
  ) {
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