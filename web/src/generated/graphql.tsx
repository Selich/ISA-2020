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
  allergies?: Maybe<Array<Medicine>>;
  getPatient?: Maybe<Array<Appointment>>;
  patient?: Maybe<Patient>;
  patients?: Maybe<Array<Patient>>;
  patientsByDoctor?: Maybe<Array<Patient>>;
  tiers?: Maybe<Array<Tier>>;
  me?: Maybe<User>;
  appointmentsByUser?: Maybe<Array<Appointment>>;
  appointmentsPatient?: Maybe<Array<Appointment>>;
  allAppointments?: Maybe<Array<Appointment>>;
  appointments?: Maybe<Array<Appointment>>;
  freeAppointments?: Maybe<Array<Appointment>>;
  definitions?: Maybe<Array<AppointmentDefinition>>;
  available?: Maybe<Array<Appointment>>;
  appointment?: Maybe<Appointment>;
  holiday?: Maybe<Array<Holiday>>;
  getSchedule?: Maybe<Array<Appointment>>;
  employee?: Maybe<Employee>;
  dermsByPharm?: Maybe<Array<Employee>>;
  getEmployeesByPharm?: Maybe<Array<Employee>>;
  employees?: Maybe<Array<Employee>>;
  complaints?: Maybe<Array<Complaint>>;
  reservations?: Maybe<Array<Reservation>>;
  res?: Maybe<Array<Reservation>>;
  medicines?: Maybe<Array<Medicine>>;
  shop?: Maybe<Array<Medicine>>;
  getReport?: Maybe<Array<Medicine>>;
  pharmacyMedicine?: Maybe<Array<Pharmacy>>;
  pharmacies?: Maybe<Array<Pharmacy>>;
  pharmacy?: Maybe<Pharmacy>;
  freePharms?: Maybe<Array<Employee>>;
  inventory?: Maybe<Array<MedicineItem>>;
  subscribedPharmacies?: Maybe<Array<Pharmacy>>;
  getAdmins?: Maybe<Array<Employee>>;
  freePharmacists?: Maybe<Array<Employee>>;
  containsMedicine?: Maybe<Array<PharmacyPrice>>;
  getPrescriptionsByPatient?: Maybe<Array<Prescription>>;
  getMedicineForPatient?: Maybe<Array<Medicine>>;
  ratingDerm?: Maybe<Array<Employee>>;
  ratingPharm?: Maybe<Array<Employee>>;
  ratingMedicine?: Maybe<Array<Medicine>>;
  ratingPharmacy?: Maybe<Array<Pharmacy>>;
  employeesComplaint?: Maybe<Array<Employee>>;
  complaintsPatient?: Maybe<Array<Complaint>>;
};


export type QueryAllergiesArgs = {
  token: Scalars['String'];
};


export type QueryGetPatientArgs = {
  inputs: PatientInput;
};


export type QueryPatientArgs = {
  token: Scalars['String'];
};


export type QueryPatientsByDoctorArgs = {
  inputs: PatientInput;
  token: Scalars['String'];
};


export type QueryMeArgs = {
  token: Scalars['String'];
};


export type QueryAppointmentsByUserArgs = {
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type QueryAppointmentsPatientArgs = {
  type: Scalars['String'];
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type QueryAppointmentsArgs = {
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type QueryFreeAppointmentsArgs = {
  kind: Scalars['String'];
  token: Scalars['String'];
  pharmacyId: Scalars['String'];
};


export type QueryAvailableArgs = {
  id: Scalars['String'];
};


export type QueryAppointmentArgs = {
  date: Scalars['String'];
};


export type QueryHolidayArgs = {
  token: Scalars['String'];
};


export type QueryGetScheduleArgs = {
  token: Scalars['String'];
};


export type QueryEmployeeArgs = {
  token: Scalars['String'];
};


export type QueryDermsByPharmArgs = {
  token: Scalars['String'];
};


export type QueryGetEmployeesByPharmArgs = {
  inputs: EmployeeInput;
};


export type QueryEmployeesArgs = {
  token: Scalars['String'];
  inputs: EmployeeInput;
};


export type QueryReservationsArgs = {
  token: Scalars['String'];
};


export type QueryGetReportArgs = {
  inputs: MedicineItemInput;
};


export type QueryPharmacyMedicineArgs = {
  inputs: MedicineInput;
};


export type QueryPharmacyArgs = {
  token: Scalars['String'];
  inputs: PharmacyInput;
};


export type QueryFreePharmsArgs = {
  inputs: DateInput;
};


export type QueryInventoryArgs = {
  token: Scalars['String'];
};


export type QuerySubscribedPharmaciesArgs = {
  token: Scalars['String'];
};


export type QueryGetAdminsArgs = {
  inputs: PharmacyInput;
};


export type QueryContainsMedicineArgs = {
  id: Scalars['String'];
};


export type QueryGetPrescriptionsByPatientArgs = {
  token: Scalars['String'];
};


export type QueryGetMedicineForPatientArgs = {
  pharmacyInput: PharmacyInput;
  patientInput: UserInput;
};


export type QueryRatingDermArgs = {
  token: Scalars['String'];
};


export type QueryRatingPharmArgs = {
  token: Scalars['String'];
};


export type QueryRatingMedicineArgs = {
  token: Scalars['String'];
};


export type QueryRatingPharmacyArgs = {
  token: Scalars['String'];
};


export type QueryComplaintsPatientArgs = {
  token: Scalars['String'];
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
  patientsAllergic?: Maybe<Array<Patient>>;
  ratings: Array<Rating>;
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isEnabled: Scalars['Boolean'];
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
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  patient?: Maybe<Patient>;
  employee?: Maybe<Employee>;
  pharmacy?: Maybe<Pharmacy>;
  prescription?: Maybe<Prescription>;
  kind: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  report?: Maybe<Scalars['String']>;
  isVisited?: Maybe<Scalars['Boolean']>;
  begin?: Maybe<Scalars['DateTime']>;
  length?: Maybe<Scalars['Float']>;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address: Address;
  telephone: Scalars['String'];
  holidays?: Maybe<Array<Holiday>>;
  ratings: Array<Rating>;
  workingHours?: Maybe<Array<WorkingHours>>;
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
  comments?: Maybe<Scalars['String']>;
  pharmacyId?: Maybe<Scalars['Float']>;
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
  name?: Maybe<Scalars['String']>;
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
  prices?: Maybe<Array<Price>>;
  reservation: Reservation;
  quantity?: Maybe<Scalars['Float']>;
  currentPrice?: Maybe<Scalars['Float']>;
  dateOfPurchase?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
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
  medicine: MedicineItem;
  price: Scalars['Float'];
  from: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  pharmacy?: Maybe<Pharmacy>;
  patient?: Maybe<Patient>;
  medicineItem?: Maybe<MedicineItem>;
  deadline?: Maybe<Scalars['String']>;
  pickupDate?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  originalId?: Maybe<Scalars['Float']>;
  isBought?: Maybe<Scalars['Boolean']>;
  totalSum?: Maybe<Scalars['Float']>;
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
  id?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  telephone?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  tier?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  penalty?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  version: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address: Address;
  telephone: Scalars['String'];
};

export type AppointmentInput = {
  id?: Maybe<Scalars['Float']>;
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  kind?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  report?: Maybe<Scalars['String']>;
  isVisited?: Maybe<Scalars['Boolean']>;
  begin?: Maybe<Scalars['DateTime']>;
  length?: Maybe<Scalars['Float']>;
};

export type EmployeeInput = {
  id?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  telephone?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
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
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
};

export type MedicineItemInput = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  details?: Maybe<MedicineInput>;
  list?: Maybe<InventoryInput>;
  quantity?: Maybe<Scalars['Float']>;
  currentPrice?: Maybe<Scalars['Float']>;
  dateOfPurchase?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
};

export type MedicineInput = {
  id?: Maybe<Scalars['Float']>;
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

export type InventoryInput = {
  medicines?: Maybe<Array<MedicineItemInput>>;
  id?: Maybe<Scalars['String']>;
  pharmacy?: Maybe<PharmacyInput>;
};

export type DateInput = {
  date?: Maybe<Scalars['String']>;
  hours?: Maybe<Scalars['String']>;
  minutes?: Maybe<Scalars['String']>;
};

export type PharmacyPrice = {
  __typename?: 'PharmacyPrice';
  pharmacy?: Maybe<Pharmacy>;
  medicineItem?: Maybe<MedicineItem>;
};

export type UserInput = {
  id?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  telephone?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTier?: Maybe<Tier>;
  addAllergie?: Maybe<Patient>;
  addRating?: Maybe<Rating>;
  addComplaint?: Maybe<Complaint>;
  unsubscribe?: Maybe<Patient>;
  subscribe?: Maybe<Patient>;
  rate?: Maybe<Rating>;
  editUser?: Maybe<User>;
  login: UserResponse;
  register: UserResponse;
  confirmRegistration: PatientResponse;
  logout: Scalars['Boolean'];
  notArrived?: Maybe<Appointment>;
  unschedulePatient?: Maybe<Appointment>;
  createDefinition?: Maybe<AppointmentDefinition>;
  unschedule?: Maybe<Appointment>;
  scheduleAppointmentEmployee?: Maybe<Appointment>;
  scheduleConsultation?: Maybe<Appointment>;
  schedule?: Maybe<Appointment>;
  addFreeApp?: Maybe<Appointment>;
  requestHoliday?: Maybe<Holiday>;
  denyHoliday?: Maybe<Holiday>;
  approveHoliday?: Maybe<Holiday>;
  addWorkingHours?: Maybe<Employee>;
  removeEmployee: Employee;
  addEmployee: EmployeeResponse;
  confirmPassword: UserResponse;
  getReservationByCode?: Maybe<Reservation>;
  reserveMedicine?: Maybe<ReservationResponse>;
  cancelReservation?: Maybe<Reservation>;
  pickupReservation?: Maybe<Reservation>;
  createMedicine?: Maybe<Medicine>;
  removeMedicine?: Maybe<Inventory>;
  addMedicineDefinition?: Maybe<Medicine>;
  addMedicine?: Maybe<MedicineItem>;
  addPrice?: Maybe<MedicineItem>;
  eprescriptions?: Maybe<Array<EPrescription>>;
  addAdmin?: Maybe<Employee>;
  createPharmacy?: Maybe<Pharmacy>;
  removePharmacy?: Maybe<Pharmacy>;
  createPrescription: Prescription;
  ratePharm?: Maybe<Rating>;
  rateDerm?: Maybe<Rating>;
  ratePharmacy?: Maybe<Array<Medicine>>;
  rateMedicine?: Maybe<Rating>;
  createComplaint?: Maybe<Complaint>;
  answerComplaint?: Maybe<Complaint>;
};


export type MutationCreateTierArgs = {
  inputs: TierInput;
};


export type MutationAddAllergieArgs = {
  token: Scalars['String'];
  inputs: MedicineInput;
};


export type MutationAddRatingArgs = {
  inputs: RatingInput;
};


export type MutationAddComplaintArgs = {
  inputs: ComplaintInput;
};


export type MutationUnsubscribeArgs = {
  token: Scalars['String'];
  inputs: SubscriptionInput;
};


export type MutationSubscribeArgs = {
  token: Scalars['String'];
  inputs: SubscriptionInput;
};


export type MutationRateArgs = {
  inputs: RatingInput;
};


export type MutationEditUserArgs = {
  inputs: UserInput;
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  inputs: UserInput;
};


export type MutationRegisterArgs = {
  inputs: UserInput;
};


export type MutationConfirmRegistrationArgs = {
  email: Scalars['String'];
};


export type MutationNotArrivedArgs = {
  inputs: AppointmentInput;
};


export type MutationUnschedulePatientArgs = {
  token: Scalars['String'];
  inputs: AppointmentInput;
};


export type MutationCreateDefinitionArgs = {
  inputs: AppointmentDefinitionInput;
};


export type MutationUnscheduleArgs = {
  inputs: AppointmentInput;
};


export type MutationScheduleAppointmentEmployeeArgs = {
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type MutationScheduleConsultationArgs = {
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type MutationScheduleArgs = {
  inputs: AppointmentInput;
  token: Scalars['String'];
};


export type MutationAddFreeAppArgs = {
  employee: EmployeeInput;
  token: Scalars['String'];
  discount: Scalars['Float'];
  length: Scalars['Float'];
  from: Scalars['String'];
};


export type MutationRequestHolidayArgs = {
  token: Scalars['String'];
  inputs: HolidayInput;
};


export type MutationDenyHolidayArgs = {
  token: Scalars['String'];
  inputs: HolidayInput;
};


export type MutationApproveHolidayArgs = {
  token: Scalars['String'];
  inputs: HolidayInput;
};


export type MutationAddWorkingHoursArgs = {
  token: Scalars['String'];
  inputs: EmployeeInput;
};


export type MutationRemoveEmployeeArgs = {
  id: Scalars['String'];
};


export type MutationAddEmployeeArgs = {
  token: Scalars['String'];
  inputs: EmployeeInput;
};


export type MutationConfirmPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  oldPass: Scalars['String'];
};


export type MutationGetReservationByCodeArgs = {
  code: Scalars['String'];
};


export type MutationReserveMedicineArgs = {
  token: Scalars['String'];
  inputs: ReservationInput;
};


export type MutationCancelReservationArgs = {
  token: Scalars['String'];
  inputs: ReservationInput;
};


export type MutationPickupReservationArgs = {
  inputs: ReservationInput;
};


export type MutationCreateMedicineArgs = {
  inputs: MedicineInput;
};


export type MutationRemoveMedicineArgs = {
  inputs: MedicineItemInput;
};


export type MutationAddMedicineDefinitionArgs = {
  inputs: MedicineInput;
};


export type MutationAddMedicineArgs = {
  token: Scalars['String'];
  inputs: MedicineItemInput;
};


export type MutationAddPriceArgs = {
  token: Scalars['String'];
  inputs: MedicineItemInput;
};


export type MutationEprescriptionsArgs = {
  email: Scalars['String'];
};


export type MutationAddAdminArgs = {
  inputs: EmployeeInput;
};


export type MutationCreatePharmacyArgs = {
  inputs: PharmacyInput;
};


export type MutationRemovePharmacyArgs = {
  inputs: PharmacyInput;
};


export type MutationCreatePrescriptionArgs = {
  medicineInput: MedicineItemInput;
  appointmentInputs: AppointmentInput;
};


export type MutationRatePharmArgs = {
  token: Scalars['String'];
  inputs: EmployeeInput;
};


export type MutationRateDermArgs = {
  token: Scalars['String'];
  inputs: EmployeeInput;
};


export type MutationRatePharmacyArgs = {
  token: Scalars['String'];
  inputs: PharmacyInput;
};


export type MutationRateMedicineArgs = {
  token: Scalars['String'];
  inputs: MedicineInput;
};


export type MutationCreateComplaintArgs = {
  inputs: ComplaintInput;
};


export type MutationAnswerComplaintArgs = {
  inputs: ComplaintInput;
};

export type TierInput = {
  name?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  scoreMin?: Maybe<Scalars['Float']>;
  scoreMax?: Maybe<Scalars['Float']>;
};

export type RatingInput = {
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  medicine?: Maybe<MedicineInput>;
  rating?: Maybe<Scalars['Float']>;
};

export type ComplaintInput = {
  patient?: Maybe<PatientInput>;
  employee?: Maybe<EmployeeInput>;
  pharmacy?: Maybe<PharmacyInput>;
  description?: Maybe<Scalars['String']>;
  answer?: Maybe<Scalars['String']>;
};

export type SubscriptionInput = {
  patient?: Maybe<PatientInput>;
  pharmacy?: Maybe<PharmacyInput>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PatientResponse = {
  __typename?: 'PatientResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Patient>;
};

export type AppointmentDefinitionInput = {
  price?: Maybe<Scalars['Float']>;
  kind?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  pharmId?: Maybe<Scalars['Float']>;
};

export type HolidayInput = {
  id?: Maybe<Scalars['ID']>;
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
  user?: Maybe<Employee>;
};

export type ReservationResponse = {
  __typename?: 'ReservationResponse';
  errors?: Maybe<Array<FieldError>>;
  reservation?: Maybe<Reservation>;
};

export type ReservationInput = {
  id?: Maybe<Scalars['Float']>;
  originalId?: Maybe<Scalars['Float']>;
  pharmacyId?: Maybe<Scalars['Float']>;
  patientId?: Maybe<Scalars['Float']>;
  medicineId?: Maybe<Scalars['Float']>;
  deadline?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
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

export type AddAdminMutationVariables = Exact<{
  inputs: EmployeeInput;
}>;


export type AddAdminMutation = (
  { __typename?: 'Mutation' }
  & { addAdmin?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName' | 'email'>
  )> }
);

export type AddAllergieMutationVariables = Exact<{
  inputs: MedicineInput;
  token: Scalars['String'];
}>;


export type AddAllergieMutation = (
  { __typename?: 'Mutation' }
  & { addAllergie?: Maybe<(
    { __typename?: 'Patient' }
    & { allergies?: Maybe<Array<(
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'name'>
    )>> }
  )> }
);

export type AddComplaintMutationVariables = Exact<{
  inputs: ComplaintInput;
}>;


export type AddComplaintMutation = (
  { __typename?: 'Mutation' }
  & { addComplaint?: Maybe<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'description'>
  )> }
);

export type AddEmployeeMutationVariables = Exact<{
  inputs: EmployeeInput;
  token: Scalars['String'];
}>;


export type AddEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { addEmployee: (
    { __typename?: 'EmployeeResponse' }
    & { user?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'email'>
    )> }
  ) }
);

export type AddFreeAppMutationVariables = Exact<{
  from: Scalars['String'];
  length: Scalars['Float'];
  token: Scalars['String'];
  discount: Scalars['Float'];
  employee: EmployeeInput;
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

export type AddMedicineMutationVariables = Exact<{
  inputs: MedicineItemInput;
  token: Scalars['String'];
}>;


export type AddMedicineMutation = (
  { __typename?: 'Mutation' }
  & { addMedicine?: Maybe<(
    { __typename?: 'MedicineItem' }
    & Pick<MedicineItem, 'quantity'>
    & { details?: Maybe<(
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'name' | 'code'>
    )> }
  )> }
);

export type AddMedicineDefinitionMutationVariables = Exact<{
  inputs: MedicineInput;
}>;


export type AddMedicineDefinitionMutation = (
  { __typename?: 'Mutation' }
  & { addMedicineDefinition?: Maybe<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'name'>
  )> }
);

export type AddPriceMutationVariables = Exact<{
  inputs: MedicineItemInput;
  token: Scalars['String'];
}>;


export type AddPriceMutation = (
  { __typename?: 'Mutation' }
  & { addPrice?: Maybe<(
    { __typename?: 'MedicineItem' }
    & Pick<MedicineItem, 'quantity' | 'currentPrice'>
    & { details?: Maybe<(
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'name' | 'code'>
    )> }
  )> }
);

export type AddRatingMutationVariables = Exact<{
  inputs: RatingInput;
}>;


export type AddRatingMutation = (
  { __typename?: 'Mutation' }
  & { addRating?: Maybe<(
    { __typename?: 'Rating' }
    & Pick<Rating, 'rating'>
  )> }
);

export type AddReservationMutationVariables = Exact<{
  inputs: ReservationInput;
  token: Scalars['String'];
}>;


export type AddReservationMutation = (
  { __typename?: 'Mutation' }
  & { reserveMedicine?: Maybe<(
    { __typename?: 'ReservationResponse' }
    & { reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'deadline'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type AddWorkingHoursMutationVariables = Exact<{
  inputs: EmployeeInput;
  token: Scalars['String'];
}>;


export type AddWorkingHoursMutation = (
  { __typename?: 'Mutation' }
  & { addWorkingHours?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email'>
  )> }
);

export type AnswerComplaintMutationVariables = Exact<{
  inputs: ComplaintInput;
}>;


export type AnswerComplaintMutation = (
  { __typename?: 'Mutation' }
  & { answerComplaint?: Maybe<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'description'>
  )> }
);

export type ApproveHolidayMutationVariables = Exact<{
  inputs: HolidayInput;
  token: Scalars['String'];
}>;


export type ApproveHolidayMutation = (
  { __typename?: 'Mutation' }
  & { approveHoliday?: Maybe<(
    { __typename?: 'Holiday' }
    & Pick<Holiday, 'from' | 'until'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type CancelReservationMutationVariables = Exact<{
  inputs: ReservationInput;
  token: Scalars['String'];
}>;


export type CancelReservationMutation = (
  { __typename?: 'Mutation' }
  & { cancelReservation?: Maybe<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'isBought'>
    & { medicineItem?: Maybe<(
      { __typename?: 'MedicineItem' }
      & { details?: Maybe<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'name'>
      )> }
    )> }
  )> }
);

export type ComplaintMutationVariables = Exact<{
  inputs: ComplaintInput;
}>;


export type ComplaintMutation = (
  { __typename?: 'Mutation' }
  & { createComplaint?: Maybe<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'description'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type ConfirmPasswordMutationVariables = Exact<{
  oldPass: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ConfirmPasswordMutation = (
  { __typename?: 'Mutation' }
  & { confirmPassword: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
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

export type CreateComplaintMutationVariables = Exact<{
  inputs: ComplaintInput;
}>;


export type CreateComplaintMutation = (
  { __typename?: 'Mutation' }
  & { createComplaint?: Maybe<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'description'>
  )> }
);

export type CreateDefinitionMutationVariables = Exact<{
  inputs: AppointmentDefinitionInput;
}>;


export type CreateDefinitionMutation = (
  { __typename?: 'Mutation' }
  & { createDefinition?: Maybe<(
    { __typename?: 'AppointmentDefinition' }
    & Pick<AppointmentDefinition, 'kind' | 'price' | 'score'>
  )> }
);

export type CreateMedicineMutationVariables = Exact<{
  inputs: MedicineInput;
}>;


export type CreateMedicineMutation = (
  { __typename?: 'Mutation' }
  & { createMedicine?: Maybe<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'code'>
  )> }
);

export type CreatePharmacyMutationVariables = Exact<{
  inputs: PharmacyInput;
}>;


export type CreatePharmacyMutation = (
  { __typename?: 'Mutation' }
  & { createPharmacy?: Maybe<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name'>
  )> }
);

export type CreatePrescriptionMutationVariables = Exact<{
  appointmentInputs: AppointmentInput;
  medicineInput: MedicineItemInput;
}>;


export type CreatePrescriptionMutation = (
  { __typename?: 'Mutation' }
  & { createPrescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id'>
  ) }
);

export type CreateTierMutationVariables = Exact<{
  inputs: TierInput;
}>;


export type CreateTierMutation = (
  { __typename?: 'Mutation' }
  & { createTier?: Maybe<(
    { __typename?: 'Tier' }
    & Pick<Tier, 'name' | 'discount'>
  )> }
);

export type DenyHolidayMutationVariables = Exact<{
  inputs: HolidayInput;
  token: Scalars['String'];
}>;


export type DenyHolidayMutation = (
  { __typename?: 'Mutation' }
  & { denyHoliday?: Maybe<(
    { __typename?: 'Holiday' }
    & Pick<Holiday, 'from' | 'until'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type EditUserMutationVariables = Exact<{
  inputs: UserInput;
  token: Scalars['String'];
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'telephone' | 'email'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    ) }
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
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'firstName' | 'lastName' | 'role' | 'isEnabled'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type NotArrivedMutationVariables = Exact<{
  inputs: AppointmentInput;
}>;


export type NotArrivedMutation = (
  { __typename?: 'Mutation' }
  & { notArrived?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName' | 'email'>
    )>, employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'lastName'>
    )> }
  )> }
);

export type PickupReservationMutationVariables = Exact<{
  inputs: ReservationInput;
}>;


export type PickupReservationMutation = (
  { __typename?: 'Mutation' }
  & { pickupReservation?: Maybe<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'deadline' | 'isBought'>
  )> }
);

export type RateMutationVariables = Exact<{
  inputs: RatingInput;
}>;


export type RateMutation = (
  { __typename?: 'Mutation' }
  & { rate?: Maybe<(
    { __typename?: 'Rating' }
    & Pick<Rating, 'createdAt'>
  )> }
);

export type RateDermMutationVariables = Exact<{
  inputs: EmployeeInput;
  token: Scalars['String'];
}>;


export type RateDermMutation = (
  { __typename?: 'Mutation' }
  & { rateDerm?: Maybe<(
    { __typename?: 'Rating' }
    & Pick<Rating, 'rating'>
  )> }
);

export type RateMedicineMutationVariables = Exact<{
  inputs: MedicineInput;
  token: Scalars['String'];
}>;


export type RateMedicineMutation = (
  { __typename?: 'Mutation' }
  & { rateMedicine?: Maybe<(
    { __typename?: 'Rating' }
    & Pick<Rating, 'rating'>
  )> }
);

export type RatePharmMutationVariables = Exact<{
  inputs: EmployeeInput;
  token: Scalars['String'];
}>;


export type RatePharmMutation = (
  { __typename?: 'Mutation' }
  & { ratePharm?: Maybe<(
    { __typename?: 'Rating' }
    & Pick<Rating, 'rating'>
  )> }
);

export type RatePharmacyMutationVariables = Exact<{
  inputs: PharmacyInput;
  token: Scalars['String'];
}>;


export type RatePharmacyMutation = (
  { __typename?: 'Mutation' }
  & { ratePharmacy?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'name'>
  )>> }
);

export type RegisterMutationVariables = Exact<{
  inputs: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  ) }
);

export type RemoveEmployeeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { removeEmployee: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'email'>
  ) }
);

export type RequestHolidayMutationVariables = Exact<{
  inputs: HolidayInput;
  token: Scalars['String'];
}>;


export type RequestHolidayMutation = (
  { __typename?: 'Mutation' }
  & { requestHoliday?: Maybe<(
    { __typename?: 'Holiday' }
    & Pick<Holiday, 'isApproved' | 'from' | 'until'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'email'>
    )> }
  )> }
);

export type ReserveMedicineMutationVariables = Exact<{
  inputs: ReservationInput;
  token: Scalars['String'];
}>;


export type ReserveMedicineMutation = (
  { __typename?: 'Mutation' }
  & { reserveMedicine?: Maybe<(
    { __typename?: 'ReservationResponse' }
    & { reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'isBought'>
      & { pharmacy?: Maybe<(
        { __typename?: 'Pharmacy' }
        & Pick<Pharmacy, 'name'>
      )>, patient?: Maybe<(
        { __typename?: 'Patient' }
        & Pick<Patient, 'email'>
      )>, medicineItem?: Maybe<(
        { __typename?: 'MedicineItem' }
        & Pick<MedicineItem, 'quantity'>
        & { details?: Maybe<(
          { __typename?: 'Medicine' }
          & Pick<Medicine, 'name'>
        )> }
      )> }
    )> }
  )> }
);

export type ScheduleMutationVariables = Exact<{
  token: Scalars['String'];
  inputs: AppointmentInput;
}>;


export type ScheduleMutation = (
  { __typename?: 'Mutation' }
  & { schedule?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length' | 'price'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )> }
  )> }
);

export type ScheduleAppointmentEmployeeMutationVariables = Exact<{
  inputs: AppointmentInput;
  token: Scalars['String'];
}>;


export type ScheduleAppointmentEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { scheduleAppointmentEmployee?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName'>
    )>, employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'lastName'>
    )> }
  )> }
);

export type ScheduleConsultationMutationVariables = Exact<{
  inputs: AppointmentInput;
  token: Scalars['String'];
}>;


export type ScheduleConsultationMutation = (
  { __typename?: 'Mutation' }
  & { scheduleConsultation?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName'>
    )>, employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type SubscribeMutationVariables = Exact<{
  inputs: SubscriptionInput;
  token: Scalars['String'];
}>;


export type SubscribeMutation = (
  { __typename?: 'Mutation' }
  & { subscribe?: Maybe<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'email'>
    & { subscriptions?: Maybe<Array<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>> }
  )> }
);

export type UnsubscribeMutationVariables = Exact<{
  inputs: SubscriptionInput;
  token: Scalars['String'];
}>;


export type UnsubscribeMutation = (
  { __typename?: 'Mutation' }
  & { unsubscribe?: Maybe<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'email'>
    & { subscriptions?: Maybe<Array<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>> }
  )> }
);

export type UnscheduleMutationVariables = Exact<{
  inputs: AppointmentInput;
}>;


export type UnscheduleMutation = (
  { __typename?: 'Mutation' }
  & { unschedule?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length' | 'price'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )> }
  )> }
);

export type UnschedulePatientMutationVariables = Exact<{
  inputs: AppointmentInput;
  token: Scalars['String'];
}>;


export type UnschedulePatientMutation = (
  { __typename?: 'Mutation' }
  & { unschedulePatient?: Maybe<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length' | 'price'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'email'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )> }
  )> }
);

export type FreePharmsQueryVariables = Exact<{
  inputs: DateInput;
}>;


export type FreePharmsQuery = (
  { __typename?: 'Query' }
  & { freePharms?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'email' | 'firstName' | 'lastName' | 'averageRating'>
    & { workingHours?: Maybe<Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'id' | 'name' | 'averageRating'>
      & { definitions: Array<(
        { __typename?: 'AppointmentDefinition' }
        & Pick<AppointmentDefinition, 'price' | 'score' | 'kind'>
      )>, address?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'street' | 'city'>
      )> }
    )> }
  )>> }
);

export type AllAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAppointmentsQuery = (
  { __typename?: 'Query' }
  & { allAppointments?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'kind' | 'begin'>
  )>> }
);

export type AllergiesQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type AllergiesQuery = (
  { __typename?: 'Query' }
  & { allergies?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'name' | 'form' | 'kind' | 'info'>
  )>> }
);

export type AppointmentsQueryVariables = Exact<{
  inputs: AppointmentInput;
  token: Scalars['String'];
}>;


export type AppointmentsQuery = (
  { __typename?: 'Query' }
  & { appointments?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'id' | 'price' | 'length' | 'kind' | 'begin'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'averageRating' | 'firstName' | 'email' | 'lastName'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'id'>
    )>, patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id' | 'firstName' | 'email' | 'lastName'>
      & { allergies?: Maybe<Array<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'id' | 'name'>
      )>> }
    )> }
  )>> }
);

export type AppointmentsByUserQueryVariables = Exact<{
  token: Scalars['String'];
  inputs: AppointmentInput;
}>;


export type AppointmentsByUserQuery = (
  { __typename?: 'Query' }
  & { appointmentsByUser?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'id' | 'begin' | 'price' | 'length' | 'isVisited'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName' | 'role' | 'email' | 'averageRating'>
    )>, patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type AppointmentsPatientQueryVariables = Exact<{
  token: Scalars['String'];
  inputs: AppointmentInput;
  type: Scalars['String'];
}>;


export type AppointmentsPatientQuery = (
  { __typename?: 'Query' }
  & { appointmentsPatient?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'id' | 'kind' | 'begin' | 'price' | 'length' | 'isVisited'>
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>, employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName' | 'role' | 'email' | 'averageRating'>
    )>, patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName'>
    )> }
  )>> }
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

export type ComplaintsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComplaintsQuery = (
  { __typename?: 'Query' }
  & { complaints?: Maybe<Array<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'description'>
  )>> }
);

export type ComplaintsPatientQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ComplaintsPatientQuery = (
  { __typename?: 'Query' }
  & { complaintsPatient?: Maybe<Array<(
    { __typename?: 'Complaint' }
    & Pick<Complaint, 'createdAt' | 'description'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName' | 'email' | 'role'>
    )>, patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName' | 'email'>
    )> }
  )>> }
);

export type ContainsMedicineQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContainsMedicineQuery = (
  { __typename?: 'Query' }
  & { containsMedicine?: Maybe<Array<(
    { __typename?: 'PharmacyPrice' }
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'id' | 'name'>
    )>, medicineItem?: Maybe<(
      { __typename?: 'MedicineItem' }
      & Pick<MedicineItem, 'id' | 'currentPrice'>
    )> }
  )>> }
);

export type DefinitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DefinitionsQuery = (
  { __typename?: 'Query' }
  & { definitions?: Maybe<Array<(
    { __typename?: 'AppointmentDefinition' }
    & Pick<AppointmentDefinition, 'kind' | 'price' | 'score'>
  )>> }
);

export type DermsByPharmQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type DermsByPharmQuery = (
  { __typename?: 'Query' }
  & { dermsByPharm?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'role' | 'firstName' | 'lastName' | 'averageRating'>
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>, holidays?: Maybe<Array<(
      { __typename?: 'Holiday' }
      & Pick<Holiday, 'from' | 'until'>
    )>>, workingHours?: Maybe<Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>> }
  )>> }
);

export type EmployeeQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type EmployeeQuery = (
  { __typename?: 'Query' }
  & { employee?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'role' | 'email' | 'firstName' | 'lastName'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    ), pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'id' | 'name'>
    )> }
  )> }
);

export type EmployeesQueryVariables = Exact<{
  inputs: EmployeeInput;
  token: Scalars['String'];
}>;


export type EmployeesQuery = (
  { __typename?: 'Query' }
  & { employees?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'role' | 'firstName' | 'lastName' | 'averageRating'>
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>, holidays?: Maybe<Array<(
      { __typename?: 'Holiday' }
      & Pick<Holiday, 'from' | 'until'>
    )>>, workingHours?: Maybe<Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>> }
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

export type FreeAppointmentsQueryVariables = Exact<{
  pharmacyId: Scalars['String'];
  token: Scalars['String'];
  kind: Scalars['String'];
}>;


export type FreeAppointmentsQuery = (
  { __typename?: 'Query' }
  & { freeAppointments?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'id' | 'price' | 'begin'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'email' | 'lastName' | 'averageRating'>
    )>, pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>, patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName'>
    )> }
  )>> }
);

export type FreePharmacistsQueryVariables = Exact<{ [key: string]: never; }>;


export type FreePharmacistsQuery = (
  { __typename?: 'Query' }
  & { freePharmacists?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'email' | 'lastName' | 'averageRating' | 'role'>
  )>> }
);

export type GetAdminsQueryVariables = Exact<{
  inputs: PharmacyInput;
}>;


export type GetAdminsQuery = (
  { __typename?: 'Query' }
  & { getAdmins?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'role' | 'firstName' | 'lastName' | 'averageRating'>
    & { pharmacy?: Maybe<(
      { __typename?: 'Pharmacy' }
      & Pick<Pharmacy, 'name'>
    )>, holidays?: Maybe<Array<(
      { __typename?: 'Holiday' }
      & Pick<Holiday, 'from' | 'until'>
    )>>, workingHours?: Maybe<Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>> }
  )>> }
);

export type GetEmployeesByPharmQueryVariables = Exact<{
  inputs: EmployeeInput;
}>;


export type GetEmployeesByPharmQuery = (
  { __typename?: 'Query' }
  & { getEmployeesByPharm?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'firstName' | 'lastName' | 'averageRating'>
    & { holidays?: Maybe<Array<(
      { __typename?: 'Holiday' }
      & Pick<Holiday, 'from' | 'until'>
    )>>, workingHours?: Maybe<Array<(
      { __typename?: 'WorkingHours' }
      & Pick<WorkingHours, 'from' | 'until'>
    )>> }
  )>> }
);

export type GetMedicineForPatientQueryVariables = Exact<{
  patientInput: UserInput;
  pharmacyInput: PharmacyInput;
}>;


export type GetMedicineForPatientQuery = (
  { __typename?: 'Query' }
  & { getMedicineForPatient?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'info' | 'kind' | 'points' | 'form' | 'contents'>
  )>> }
);

export type GetPatientQueryVariables = Exact<{
  inputs: PatientInput;
}>;


export type GetPatientQuery = (
  { __typename?: 'Query' }
  & { getPatient?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'id' | 'begin' | 'length'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'id'>
    )> }
  )>> }
);

export type GetPrescriptionsByPatientQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetPrescriptionsByPatientQuery = (
  { __typename?: 'Query' }
  & { getPrescriptionsByPatient?: Maybe<Array<(
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'deadline' | 'isUsed'>
    & { medicines?: Maybe<Array<(
      { __typename?: 'MedicineItem' }
      & { details?: Maybe<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'name'>
      )> }
    )>> }
  )>> }
);

export type GetReservationByCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetReservationByCodeMutation = (
  { __typename?: 'Mutation' }
  & { getReservationByCode?: Maybe<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'deadline' | 'code' | 'originalId'>
    & { medicineItem?: Maybe<(
      { __typename?: 'MedicineItem' }
      & Pick<MedicineItem, 'id' | 'quantity'>
      & { details?: Maybe<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'name'>
      )> }
    )> }
  )> }
);

export type HolidayQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type HolidayQuery = (
  { __typename?: 'Query' }
  & { holiday?: Maybe<Array<(
    { __typename?: 'Holiday' }
    & Pick<Holiday, 'id' | 'from' | 'until' | 'isApproved' | 'comments'>
    & { employee?: Maybe<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'role' | 'firstName' | 'lastName' | 'email'>
    )> }
  )>> }
);

export type InventoryQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type InventoryQuery = (
  { __typename?: 'Query' }
  & { inventory?: Maybe<Array<(
    { __typename?: 'MedicineItem' }
    & Pick<MedicineItem, 'id' | 'quantity' | 'currentPrice'>
    & { details?: Maybe<(
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'name' | 'code'>
    )> }
  )>> }
);

export type MeQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'role' | 'email' | 'version' | 'telephone'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    ) }
  )> }
);

export type MedicineQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicineQuery = (
  { __typename?: 'Query' }
  & { medicines?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'code' | 'info' | 'kind' | 'points' | 'form' | 'contents'>
  )>> }
);

export type PatientQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type PatientQuery = (
  { __typename?: 'Query' }
  & { patient?: Maybe<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'email' | 'firstName' | 'lastName' | 'score' | 'penalty'>
    & { tier?: Maybe<(
      { __typename?: 'Tier' }
      & Pick<Tier, 'name'>
    )>, address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country' | 'long' | 'lat'>
    ), reservations: Array<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id'>
    )> }
  )> }
);

export type PatientsQueryVariables = Exact<{ [key: string]: never; }>;


export type PatientsQuery = (
  { __typename?: 'Query' }
  & { patients?: Maybe<Array<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'firstName' | 'lastName' | 'email'>
  )>> }
);

export type PatientsByDoctorQueryVariables = Exact<{
  inputs: PatientInput;
  token: Scalars['String'];
}>;


export type PatientsByDoctorQuery = (
  { __typename?: 'Query' }
  & { patientsByDoctor?: Maybe<Array<(
    { __typename?: 'Patient' }
    & Pick<Patient, 'firstName' | 'lastName'>
  )>> }
);

export type PharmaciesQueryVariables = Exact<{ [key: string]: never; }>;


export type PharmaciesQuery = (
  { __typename?: 'Query' }
  & { pharmacies?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'id' | 'name' | 'averageRating'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country' | 'long' | 'lat'>
    )> }
  )>> }
);

export type PharmacyQueryVariables = Exact<{
  inputs: PharmacyInput;
  token: Scalars['String'];
}>;


export type PharmacyQuery = (
  { __typename?: 'Query' }
  & { pharmacy?: Maybe<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'id' | 'name' | 'averageRating'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'country'>
    )> }
  )> }
);

export type PharmacyMedicineQueryVariables = Exact<{
  inputs: MedicineInput;
}>;


export type PharmacyMedicineQuery = (
  { __typename?: 'Query' }
  & { pharmacyMedicine?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name'>
  )>> }
);

export type RatingDermQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RatingDermQuery = (
  { __typename?: 'Query' }
  & { ratingDerm?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'firstName' | 'lastName' | 'averageRating'>
  )>> }
);

export type RatingMedicineQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RatingMedicineQuery = (
  { __typename?: 'Query' }
  & { ratingMedicine?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'rating'>
  )>> }
);

export type RatingPharmQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RatingPharmQuery = (
  { __typename?: 'Query' }
  & { ratingPharm?: Maybe<Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'firstName' | 'lastName' | 'averageRating'>
  )>> }
);

export type RatingPharmacyQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RatingPharmacyQuery = (
  { __typename?: 'Query' }
  & { ratingPharmacy?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'name' | 'averageRating'>
  )>> }
);

export type ReservationsQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ReservationsQuery = (
  { __typename?: 'Query' }
  & { reservations?: Maybe<Array<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'deadline' | 'code' | 'originalId' | 'isBought'>
    & { medicineItem?: Maybe<(
      { __typename?: 'MedicineItem' }
      & Pick<MedicineItem, 'id' | 'quantity'>
      & { details?: Maybe<(
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'name'>
      )> }
    )> }
  )>> }
);

export type GetScheduleQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetScheduleQuery = (
  { __typename?: 'Query' }
  & { getSchedule?: Maybe<Array<(
    { __typename?: 'Appointment' }
    & Pick<Appointment, 'begin' | 'length' | 'kind'>
    & { patient?: Maybe<(
      { __typename?: 'Patient' }
      & Pick<Patient, 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type ShopQueryVariables = Exact<{ [key: string]: never; }>;


export type ShopQuery = (
  { __typename?: 'Query' }
  & { shop?: Maybe<Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'code' | 'name' | 'kind' | 'points' | 'form' | 'rating' | 'contents' | 'producer' | 'isPrescriptionRequired' | 'info'>
  )>> }
);

export type SubscribedPharmaciesQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type SubscribedPharmaciesQuery = (
  { __typename?: 'Query' }
  & { subscribedPharmacies?: Maybe<Array<(
    { __typename?: 'Pharmacy' }
    & Pick<Pharmacy, 'id' | 'name'>
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
export const AddAdminDocument = gql`
    mutation AddAdmin($inputs: EmployeeInput!) {
  addAdmin(inputs: $inputs) {
    firstName
    lastName
    email
  }
}
    `;

export function useAddAdminMutation() {
  return Urql.useMutation<AddAdminMutation, AddAdminMutationVariables>(AddAdminDocument);
};
export const AddAllergieDocument = gql`
    mutation AddAllergie($inputs: MedicineInput!, $token: String!) {
  addAllergie(inputs: $inputs, token: $token) {
    allergies {
      name
    }
  }
}
    `;

export function useAddAllergieMutation() {
  return Urql.useMutation<AddAllergieMutation, AddAllergieMutationVariables>(AddAllergieDocument);
};
export const AddComplaintDocument = gql`
    mutation AddComplaint($inputs: ComplaintInput!) {
  addComplaint(inputs: $inputs) {
    description
  }
}
    `;

export function useAddComplaintMutation() {
  return Urql.useMutation<AddComplaintMutation, AddComplaintMutationVariables>(AddComplaintDocument);
};
export const AddEmployeeDocument = gql`
    mutation AddEmployee($inputs: EmployeeInput!, $token: String!) {
  addEmployee(inputs: $inputs, token: $token) {
    user {
      email
    }
  }
}
    `;

export function useAddEmployeeMutation() {
  return Urql.useMutation<AddEmployeeMutation, AddEmployeeMutationVariables>(AddEmployeeDocument);
};
export const AddFreeAppDocument = gql`
    mutation AddFreeApp($from: String!, $length: Float!, $token: String!, $discount: Float!, $employee: EmployeeInput!) {
  addFreeApp(
    from: $from
    length: $length
    token: $token
    discount: $discount
    employee: $employee
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
export const AddMedicineDocument = gql`
    mutation AddMedicine($inputs: MedicineItemInput!, $token: String!) {
  addMedicine(inputs: $inputs, token: $token) {
    quantity
    details {
      name
      code
    }
  }
}
    `;

export function useAddMedicineMutation() {
  return Urql.useMutation<AddMedicineMutation, AddMedicineMutationVariables>(AddMedicineDocument);
};
export const AddMedicineDefinitionDocument = gql`
    mutation AddMedicineDefinition($inputs: MedicineInput!) {
  addMedicineDefinition(inputs: $inputs) {
    name
  }
}
    `;

export function useAddMedicineDefinitionMutation() {
  return Urql.useMutation<AddMedicineDefinitionMutation, AddMedicineDefinitionMutationVariables>(AddMedicineDefinitionDocument);
};
export const AddPriceDocument = gql`
    mutation AddPrice($inputs: MedicineItemInput!, $token: String!) {
  addPrice(inputs: $inputs, token: $token) {
    quantity
    details {
      name
      code
    }
    currentPrice
  }
}
    `;

export function useAddPriceMutation() {
  return Urql.useMutation<AddPriceMutation, AddPriceMutationVariables>(AddPriceDocument);
};
export const AddRatingDocument = gql`
    mutation AddRating($inputs: RatingInput!) {
  addRating(inputs: $inputs) {
    rating
  }
}
    `;

export function useAddRatingMutation() {
  return Urql.useMutation<AddRatingMutation, AddRatingMutationVariables>(AddRatingDocument);
};
export const AddReservationDocument = gql`
    mutation AddReservation($inputs: ReservationInput!, $token: String!) {
  reserveMedicine(inputs: $inputs, token: $token) {
    reservation {
      deadline
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useAddReservationMutation() {
  return Urql.useMutation<AddReservationMutation, AddReservationMutationVariables>(AddReservationDocument);
};
export const AddWorkingHoursDocument = gql`
    mutation AddWorkingHours($inputs: EmployeeInput!, $token: String!) {
  addWorkingHours(inputs: $inputs, token: $token) {
    email
  }
}
    `;

export function useAddWorkingHoursMutation() {
  return Urql.useMutation<AddWorkingHoursMutation, AddWorkingHoursMutationVariables>(AddWorkingHoursDocument);
};
export const AnswerComplaintDocument = gql`
    mutation AnswerComplaint($inputs: ComplaintInput!) {
  answerComplaint(inputs: $inputs) {
    description
  }
}
    `;

export function useAnswerComplaintMutation() {
  return Urql.useMutation<AnswerComplaintMutation, AnswerComplaintMutationVariables>(AnswerComplaintDocument);
};
export const ApproveHolidayDocument = gql`
    mutation ApproveHoliday($inputs: HolidayInput!, $token: String!) {
  approveHoliday(inputs: $inputs, token: $token) {
    from
    until
    employee {
      firstName
      lastName
    }
  }
}
    `;

export function useApproveHolidayMutation() {
  return Urql.useMutation<ApproveHolidayMutation, ApproveHolidayMutationVariables>(ApproveHolidayDocument);
};
export const CancelReservationDocument = gql`
    mutation CancelReservation($inputs: ReservationInput!, $token: String!) {
  cancelReservation(inputs: $inputs, token: $token) {
    id
    isBought
    medicineItem {
      details {
        name
      }
    }
  }
}
    `;

export function useCancelReservationMutation() {
  return Urql.useMutation<CancelReservationMutation, CancelReservationMutationVariables>(CancelReservationDocument);
};
export const ComplaintDocument = gql`
    mutation Complaint($inputs: ComplaintInput!) {
  createComplaint(inputs: $inputs) {
    patient {
      firstName
      lastName
    }
    description
  }
}
    `;

export function useComplaintMutation() {
  return Urql.useMutation<ComplaintMutation, ComplaintMutationVariables>(ComplaintDocument);
};
export const ConfirmPasswordDocument = gql`
    mutation ConfirmPassword($oldPass: String!, $password: String!, $confirmPassword: String!) {
  confirmPassword(
    oldPass: $oldPass
    password: $password
    confirmPassword: $confirmPassword
  ) {
    token
    errors {
      field
      message
    }
  }
}
    `;

export function useConfirmPasswordMutation() {
  return Urql.useMutation<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>(ConfirmPasswordDocument);
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
export const CreateComplaintDocument = gql`
    mutation CreateComplaint($inputs: ComplaintInput!) {
  createComplaint(inputs: $inputs) {
    description
  }
}
    `;

export function useCreateComplaintMutation() {
  return Urql.useMutation<CreateComplaintMutation, CreateComplaintMutationVariables>(CreateComplaintDocument);
};
export const CreateDefinitionDocument = gql`
    mutation CreateDefinition($inputs: AppointmentDefinitionInput!) {
  createDefinition(inputs: $inputs) {
    kind
    price
    score
  }
}
    `;

export function useCreateDefinitionMutation() {
  return Urql.useMutation<CreateDefinitionMutation, CreateDefinitionMutationVariables>(CreateDefinitionDocument);
};
export const CreateMedicineDocument = gql`
    mutation CreateMedicine($inputs: MedicineInput!) {
  createMedicine(inputs: $inputs) {
    code
  }
}
    `;

export function useCreateMedicineMutation() {
  return Urql.useMutation<CreateMedicineMutation, CreateMedicineMutationVariables>(CreateMedicineDocument);
};
export const CreatePharmacyDocument = gql`
    mutation CreatePharmacy($inputs: PharmacyInput!) {
  createPharmacy(inputs: $inputs) {
    name
  }
}
    `;

export function useCreatePharmacyMutation() {
  return Urql.useMutation<CreatePharmacyMutation, CreatePharmacyMutationVariables>(CreatePharmacyDocument);
};
export const CreatePrescriptionDocument = gql`
    mutation CreatePrescription($appointmentInputs: AppointmentInput!, $medicineInput: MedicineItemInput!) {
  createPrescription(
    appointmentInputs: $appointmentInputs
    medicineInput: $medicineInput
  ) {
    id
  }
}
    `;

export function useCreatePrescriptionMutation() {
  return Urql.useMutation<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>(CreatePrescriptionDocument);
};
export const CreateTierDocument = gql`
    mutation CreateTier($inputs: TierInput!) {
  createTier(inputs: $inputs) {
    name
    discount
  }
}
    `;

export function useCreateTierMutation() {
  return Urql.useMutation<CreateTierMutation, CreateTierMutationVariables>(CreateTierDocument);
};
export const DenyHolidayDocument = gql`
    mutation DenyHoliday($inputs: HolidayInput!, $token: String!) {
  denyHoliday(inputs: $inputs, token: $token) {
    from
    until
    employee {
      firstName
      lastName
    }
  }
}
    `;

export function useDenyHolidayMutation() {
  return Urql.useMutation<DenyHolidayMutation, DenyHolidayMutationVariables>(DenyHolidayDocument);
};
export const EditUserDocument = gql`
    mutation EditUser($inputs: UserInput!, $token: String!) {
  editUser(inputs: $inputs, token: $token) {
    firstName
    lastName
    address {
      street
      city
      country
    }
    telephone
    email
  }
}
    `;

export function useEditUserMutation() {
  return Urql.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument);
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
      isEnabled
    }
    errors {
      field
      message
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
export const NotArrivedDocument = gql`
    mutation NotArrived($inputs: AppointmentInput!) {
  notArrived(inputs: $inputs) {
    patient {
      firstName
      lastName
      email
    }
    begin
    length
    employee {
      lastName
    }
  }
}
    `;

export function useNotArrivedMutation() {
  return Urql.useMutation<NotArrivedMutation, NotArrivedMutationVariables>(NotArrivedDocument);
};
export const PickupReservationDocument = gql`
    mutation PickupReservation($inputs: ReservationInput!) {
  pickupReservation(inputs: $inputs) {
    deadline
    isBought
  }
}
    `;

export function usePickupReservationMutation() {
  return Urql.useMutation<PickupReservationMutation, PickupReservationMutationVariables>(PickupReservationDocument);
};
export const RateDocument = gql`
    mutation Rate($inputs: RatingInput!) {
  rate(inputs: $inputs) {
    createdAt
  }
}
    `;

export function useRateMutation() {
  return Urql.useMutation<RateMutation, RateMutationVariables>(RateDocument);
};
export const RateDermDocument = gql`
    mutation RateDerm($inputs: EmployeeInput!, $token: String!) {
  rateDerm(inputs: $inputs, token: $token) {
    rating
  }
}
    `;

export function useRateDermMutation() {
  return Urql.useMutation<RateDermMutation, RateDermMutationVariables>(RateDermDocument);
};
export const RateMedicineDocument = gql`
    mutation RateMedicine($inputs: MedicineInput!, $token: String!) {
  rateMedicine(inputs: $inputs, token: $token) {
    rating
  }
}
    `;

export function useRateMedicineMutation() {
  return Urql.useMutation<RateMedicineMutation, RateMedicineMutationVariables>(RateMedicineDocument);
};
export const RatePharmDocument = gql`
    mutation RatePharm($inputs: EmployeeInput!, $token: String!) {
  ratePharm(inputs: $inputs, token: $token) {
    rating
  }
}
    `;

export function useRatePharmMutation() {
  return Urql.useMutation<RatePharmMutation, RatePharmMutationVariables>(RatePharmDocument);
};
export const RatePharmacyDocument = gql`
    mutation RatePharmacy($inputs: PharmacyInput!, $token: String!) {
  ratePharmacy(inputs: $inputs, token: $token) {
    name
  }
}
    `;

export function useRatePharmacyMutation() {
  return Urql.useMutation<RatePharmacyMutation, RatePharmacyMutationVariables>(RatePharmacyDocument);
};
export const RegisterDocument = gql`
    mutation Register($inputs: UserInput!) {
  register(inputs: $inputs) {
    token
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
export const RemoveEmployeeDocument = gql`
    mutation RemoveEmployee($id: String!) {
  removeEmployee(id: $id) {
    email
  }
}
    `;

export function useRemoveEmployeeMutation() {
  return Urql.useMutation<RemoveEmployeeMutation, RemoveEmployeeMutationVariables>(RemoveEmployeeDocument);
};
export const RequestHolidayDocument = gql`
    mutation RequestHoliday($inputs: HolidayInput!, $token: String!) {
  requestHoliday(inputs: $inputs, token: $token) {
    employee {
      email
    }
    isApproved
    from
    until
  }
}
    `;

export function useRequestHolidayMutation() {
  return Urql.useMutation<RequestHolidayMutation, RequestHolidayMutationVariables>(RequestHolidayDocument);
};
export const ReserveMedicineDocument = gql`
    mutation reserveMedicine($inputs: ReservationInput!, $token: String!) {
  reserveMedicine(inputs: $inputs, token: $token) {
    reservation {
      pharmacy {
        name
      }
      patient {
        email
      }
      isBought
      medicineItem {
        quantity
        details {
          name
        }
      }
    }
  }
}
    `;

export function useReserveMedicineMutation() {
  return Urql.useMutation<ReserveMedicineMutation, ReserveMedicineMutationVariables>(ReserveMedicineDocument);
};
export const ScheduleDocument = gql`
    mutation Schedule($token: String!, $inputs: AppointmentInput!) {
  schedule(token: $token, inputs: $inputs) {
    begin
    length
    price
    patient {
      email
    }
    pharmacy {
      name
    }
  }
}
    `;

export function useScheduleMutation() {
  return Urql.useMutation<ScheduleMutation, ScheduleMutationVariables>(ScheduleDocument);
};
export const ScheduleAppointmentEmployeeDocument = gql`
    mutation ScheduleAppointmentEmployee($inputs: AppointmentInput!, $token: String!) {
  scheduleAppointmentEmployee(token: $token, inputs: $inputs) {
    patient {
      firstName
    }
    begin
    length
    employee {
      lastName
    }
  }
}
    `;

export function useScheduleAppointmentEmployeeMutation() {
  return Urql.useMutation<ScheduleAppointmentEmployeeMutation, ScheduleAppointmentEmployeeMutationVariables>(ScheduleAppointmentEmployeeDocument);
};
export const ScheduleConsultationDocument = gql`
    mutation ScheduleConsultation($inputs: AppointmentInput!, $token: String!) {
  scheduleConsultation(token: $token, inputs: $inputs) {
    patient {
      firstName
    }
    begin
    length
    employee {
      firstName
      lastName
    }
  }
}
    `;

export function useScheduleConsultationMutation() {
  return Urql.useMutation<ScheduleConsultationMutation, ScheduleConsultationMutationVariables>(ScheduleConsultationDocument);
};
export const SubscribeDocument = gql`
    mutation Subscribe($inputs: SubscriptionInput!, $token: String!) {
  subscribe(inputs: $inputs, token: $token) {
    email
    subscriptions {
      name
    }
  }
}
    `;

export function useSubscribeMutation() {
  return Urql.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument);
};
export const UnsubscribeDocument = gql`
    mutation Unsubscribe($inputs: SubscriptionInput!, $token: String!) {
  unsubscribe(inputs: $inputs, token: $token) {
    email
    subscriptions {
      name
    }
  }
}
    `;

export function useUnsubscribeMutation() {
  return Urql.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument);
};
export const UnscheduleDocument = gql`
    mutation Unschedule($inputs: AppointmentInput!) {
  unschedule(inputs: $inputs) {
    begin
    length
    price
    patient {
      email
    }
    pharmacy {
      name
    }
  }
}
    `;

export function useUnscheduleMutation() {
  return Urql.useMutation<UnscheduleMutation, UnscheduleMutationVariables>(UnscheduleDocument);
};
export const UnschedulePatientDocument = gql`
    mutation UnschedulePatient($inputs: AppointmentInput!, $token: String!) {
  unschedulePatient(inputs: $inputs, token: $token) {
    begin
    length
    price
    patient {
      email
    }
    pharmacy {
      name
    }
  }
}
    `;

export function useUnschedulePatientMutation() {
  return Urql.useMutation<UnschedulePatientMutation, UnschedulePatientMutationVariables>(UnschedulePatientDocument);
};
export const FreePharmsDocument = gql`
    query FreePharms($inputs: DateInput!) {
  freePharms(inputs: $inputs) {
    email
    firstName
    lastName
    averageRating
    workingHours {
      from
      until
    }
    pharmacy {
      id
      definitions {
        price
        score
        kind
      }
      name
      averageRating
      address {
        street
        city
      }
    }
  }
}
    `;

export function useFreePharmsQuery(options: Omit<Urql.UseQueryArgs<FreePharmsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FreePharmsQuery>({ query: FreePharmsDocument, ...options });
};
export const AllAppointmentsDocument = gql`
    query AllAppointments {
  allAppointments {
    kind
    begin
  }
}
    `;

export function useAllAppointmentsQuery(options: Omit<Urql.UseQueryArgs<AllAppointmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllAppointmentsQuery>({ query: AllAppointmentsDocument, ...options });
};
export const AllergiesDocument = gql`
    query Allergies($token: String!) {
  allergies(token: $token) {
    name
    form
    kind
    info
  }
}
    `;

export function useAllergiesQuery(options: Omit<Urql.UseQueryArgs<AllergiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllergiesQuery>({ query: AllergiesDocument, ...options });
};
export const AppointmentsDocument = gql`
    query Appointments($inputs: AppointmentInput!, $token: String!) {
  appointments(token: $token, inputs: $inputs) {
    id
    price
    length
    kind
    begin
    employee {
      averageRating
      firstName
      email
      lastName
    }
    pharmacy {
      id
    }
    patient {
      id
      firstName
      email
      lastName
      allergies {
        id
        name
      }
    }
  }
}
    `;

export function useAppointmentsQuery(options: Omit<Urql.UseQueryArgs<AppointmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentsQuery>({ query: AppointmentsDocument, ...options });
};
export const AppointmentsByUserDocument = gql`
    query AppointmentsByUser($token: String!, $inputs: AppointmentInput!) {
  appointmentsByUser(token: $token, inputs: $inputs) {
    id
    employee {
      firstName
      lastName
      role
      email
      averageRating
    }
    patient {
      firstName
      lastName
    }
    begin
    price
    length
    isVisited
  }
}
    `;

export function useAppointmentsByUserQuery(options: Omit<Urql.UseQueryArgs<AppointmentsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentsByUserQuery>({ query: AppointmentsByUserDocument, ...options });
};
export const AppointmentsPatientDocument = gql`
    query AppointmentsPatient($token: String!, $inputs: AppointmentInput!, $type: String!) {
  appointmentsPatient(token: $token, inputs: $inputs, type: $type) {
    id
    kind
    pharmacy {
      name
    }
    employee {
      firstName
      lastName
      role
      email
      averageRating
    }
    patient {
      firstName
      lastName
    }
    begin
    price
    length
    isVisited
  }
}
    `;

export function useAppointmentsPatientQuery(options: Omit<Urql.UseQueryArgs<AppointmentsPatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentsPatientQuery>({ query: AppointmentsPatientDocument, ...options });
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
export const ComplaintsDocument = gql`
    query Complaints {
  complaints {
    description
  }
}
    `;

export function useComplaintsQuery(options: Omit<Urql.UseQueryArgs<ComplaintsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ComplaintsQuery>({ query: ComplaintsDocument, ...options });
};
export const ComplaintsPatientDocument = gql`
    query ComplaintsPatient($token: String!) {
  complaintsPatient(token: $token) {
    createdAt
    description
    employee {
      firstName
      lastName
      email
      role
    }
    patient {
      firstName
      lastName
      email
    }
  }
}
    `;

export function useComplaintsPatientQuery(options: Omit<Urql.UseQueryArgs<ComplaintsPatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ComplaintsPatientQuery>({ query: ComplaintsPatientDocument, ...options });
};
export const ContainsMedicineDocument = gql`
    query ContainsMedicine($id: String!) {
  containsMedicine(id: $id) {
    pharmacy {
      id
      name
    }
    medicineItem {
      id
      currentPrice
    }
  }
}
    `;

export function useContainsMedicineQuery(options: Omit<Urql.UseQueryArgs<ContainsMedicineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ContainsMedicineQuery>({ query: ContainsMedicineDocument, ...options });
};
export const DefinitionsDocument = gql`
    query Definitions {
  definitions {
    kind
    price
    score
  }
}
    `;

export function useDefinitionsQuery(options: Omit<Urql.UseQueryArgs<DefinitionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DefinitionsQuery>({ query: DefinitionsDocument, ...options });
};
export const DermsByPharmDocument = gql`
    query DermsByPharm($token: String!) {
  dermsByPharm(token: $token) {
    id
    email
    role
    firstName
    lastName
    pharmacy {
      name
    }
    holidays {
      from
      until
    }
    workingHours {
      from
      until
    }
    averageRating
  }
}
    `;

export function useDermsByPharmQuery(options: Omit<Urql.UseQueryArgs<DermsByPharmQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DermsByPharmQuery>({ query: DermsByPharmDocument, ...options });
};
export const EmployeeDocument = gql`
    query Employee($token: String!) {
  employee(token: $token) {
    id
    role
    email
    firstName
    lastName
    address {
      street
      city
      country
    }
    pharmacy {
      id
      name
    }
  }
}
    `;

export function useEmployeeQuery(options: Omit<Urql.UseQueryArgs<EmployeeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmployeeQuery>({ query: EmployeeDocument, ...options });
};
export const EmployeesDocument = gql`
    query Employees($inputs: EmployeeInput!, $token: String!) {
  employees(inputs: $inputs, token: $token) {
    id
    email
    role
    firstName
    lastName
    pharmacy {
      name
    }
    holidays {
      from
      until
    }
    workingHours {
      from
      until
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
export const FreeAppointmentsDocument = gql`
    query FreeAppointments($pharmacyId: String!, $token: String!, $kind: String!) {
  freeAppointments(pharmacyId: $pharmacyId, token: $token, kind: $kind) {
    id
    employee {
      firstName
      email
      lastName
      averageRating
    }
    pharmacy {
      name
    }
    patient {
      firstName
    }
    price
    begin
  }
}
    `;

export function useFreeAppointmentsQuery(options: Omit<Urql.UseQueryArgs<FreeAppointmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FreeAppointmentsQuery>({ query: FreeAppointmentsDocument, ...options });
};
export const FreePharmacistsDocument = gql`
    query FreePharmacists {
  freePharmacists {
    firstName
    email
    lastName
    averageRating
    role
  }
}
    `;

export function useFreePharmacistsQuery(options: Omit<Urql.UseQueryArgs<FreePharmacistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FreePharmacistsQuery>({ query: FreePharmacistsDocument, ...options });
};
export const GetAdminsDocument = gql`
    query GetAdmins($inputs: PharmacyInput!) {
  getAdmins(inputs: $inputs) {
    id
    email
    role
    firstName
    lastName
    pharmacy {
      name
    }
    holidays {
      from
      until
    }
    workingHours {
      from
      until
    }
    averageRating
  }
}
    `;

export function useGetAdminsQuery(options: Omit<Urql.UseQueryArgs<GetAdminsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAdminsQuery>({ query: GetAdminsDocument, ...options });
};
export const GetEmployeesByPharmDocument = gql`
    query GetEmployeesByPharm($inputs: EmployeeInput!) {
  getEmployeesByPharm(inputs: $inputs) {
    id
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
    averageRating
  }
}
    `;

export function useGetEmployeesByPharmQuery(options: Omit<Urql.UseQueryArgs<GetEmployeesByPharmQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetEmployeesByPharmQuery>({ query: GetEmployeesByPharmDocument, ...options });
};
export const GetMedicineForPatientDocument = gql`
    query GetMedicineForPatient($patientInput: UserInput!, $pharmacyInput: PharmacyInput!) {
  getMedicineForPatient(
    patientInput: $patientInput
    pharmacyInput: $pharmacyInput
  ) {
    id
    name
    info
    kind
    points
    form
    contents
  }
}
    `;

export function useGetMedicineForPatientQuery(options: Omit<Urql.UseQueryArgs<GetMedicineForPatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMedicineForPatientQuery>({ query: GetMedicineForPatientDocument, ...options });
};
export const GetPatientDocument = gql`
    query GetPatient($inputs: PatientInput!) {
  getPatient(inputs: $inputs) {
    id
    begin
    length
    patient {
      id
    }
  }
}
    `;

export function useGetPatientQuery(options: Omit<Urql.UseQueryArgs<GetPatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPatientQuery>({ query: GetPatientDocument, ...options });
};
export const GetPrescriptionsByPatientDocument = gql`
    query GetPrescriptionsByPatient($token: String!) {
  getPrescriptionsByPatient(token: $token) {
    deadline
    isUsed
    medicines {
      details {
        name
      }
    }
  }
}
    `;

export function useGetPrescriptionsByPatientQuery(options: Omit<Urql.UseQueryArgs<GetPrescriptionsByPatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPrescriptionsByPatientQuery>({ query: GetPrescriptionsByPatientDocument, ...options });
};
export const GetReservationByCodeDocument = gql`
    mutation GetReservationByCode($code: String!) {
  getReservationByCode(code: $code) {
    id
    deadline
    code
    originalId
    medicineItem {
      id
      details {
        name
      }
      quantity
    }
  }
}
    `;

export function useGetReservationByCodeMutation() {
  return Urql.useMutation<GetReservationByCodeMutation, GetReservationByCodeMutationVariables>(GetReservationByCodeDocument);
};
export const HolidayDocument = gql`
    query Holiday($token: String!) {
  holiday(token: $token) {
    id
    from
    until
    isApproved
    comments
    employee {
      role
      firstName
      lastName
      email
    }
  }
}
    `;

export function useHolidayQuery(options: Omit<Urql.UseQueryArgs<HolidayQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HolidayQuery>({ query: HolidayDocument, ...options });
};
export const InventoryDocument = gql`
    query Inventory($token: String!) {
  inventory(token: $token) {
    id
    details {
      name
      code
    }
    quantity
    currentPrice
  }
}
    `;

export function useInventoryQuery(options: Omit<Urql.UseQueryArgs<InventoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InventoryQuery>({ query: InventoryDocument, ...options });
};
export const MeDocument = gql`
    query Me($token: String!) {
  me(token: $token) {
    firstName
    lastName
    role
    email
    version
    address {
      street
      city
      country
    }
    telephone
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MedicineDocument = gql`
    query Medicine {
  medicines {
    id
    name
    code
    info
    kind
    points
    form
    contents
  }
}
    `;

export function useMedicineQuery(options: Omit<Urql.UseQueryArgs<MedicineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MedicineQuery>({ query: MedicineDocument, ...options });
};
export const PatientDocument = gql`
    query Patient($token: String!) {
  patient(token: $token) {
    email
    firstName
    lastName
    tier {
      name
    }
    tier {
      name
    }
    score
    penalty
    address {
      street
      city
      country
      long
      lat
    }
    reservations {
      id
    }
  }
}
    `;

export function usePatientQuery(options: Omit<Urql.UseQueryArgs<PatientQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PatientQuery>({ query: PatientDocument, ...options });
};
export const PatientsDocument = gql`
    query Patients {
  patients {
    firstName
    lastName
    email
  }
}
    `;

export function usePatientsQuery(options: Omit<Urql.UseQueryArgs<PatientsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PatientsQuery>({ query: PatientsDocument, ...options });
};
export const PatientsByDoctorDocument = gql`
    query PatientsByDoctor($inputs: PatientInput!, $token: String!) {
  patientsByDoctor(token: $token, inputs: $inputs) {
    firstName
    lastName
  }
}
    `;

export function usePatientsByDoctorQuery(options: Omit<Urql.UseQueryArgs<PatientsByDoctorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PatientsByDoctorQuery>({ query: PatientsByDoctorDocument, ...options });
};
export const PharmaciesDocument = gql`
    query Pharmacies {
  pharmacies {
    id
    name
    address {
      street
      city
      country
      long
      lat
    }
    averageRating
  }
}
    `;

export function usePharmaciesQuery(options: Omit<Urql.UseQueryArgs<PharmaciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PharmaciesQuery>({ query: PharmaciesDocument, ...options });
};
export const PharmacyDocument = gql`
    query Pharmacy($inputs: PharmacyInput!, $token: String!) {
  pharmacy(inputs: $inputs, token: $token) {
    id
    name
    averageRating
    address {
      street
      city
      country
    }
  }
}
    `;

export function usePharmacyQuery(options: Omit<Urql.UseQueryArgs<PharmacyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PharmacyQuery>({ query: PharmacyDocument, ...options });
};
export const PharmacyMedicineDocument = gql`
    query PharmacyMedicine($inputs: MedicineInput!) {
  pharmacyMedicine(inputs: $inputs) {
    name
  }
}
    `;

export function usePharmacyMedicineQuery(options: Omit<Urql.UseQueryArgs<PharmacyMedicineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PharmacyMedicineQuery>({ query: PharmacyMedicineDocument, ...options });
};
export const RatingDermDocument = gql`
    query RatingDerm($token: String!) {
  ratingDerm(token: $token) {
    id
    email
    firstName
    lastName
    averageRating
  }
}
    `;

export function useRatingDermQuery(options: Omit<Urql.UseQueryArgs<RatingDermQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RatingDermQuery>({ query: RatingDermDocument, ...options });
};
export const RatingMedicineDocument = gql`
    query RatingMedicine($token: String!) {
  ratingMedicine(token: $token) {
    id
    name
    rating
  }
}
    `;

export function useRatingMedicineQuery(options: Omit<Urql.UseQueryArgs<RatingMedicineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RatingMedicineQuery>({ query: RatingMedicineDocument, ...options });
};
export const RatingPharmDocument = gql`
    query RatingPharm($token: String!) {
  ratingPharm(token: $token) {
    id
    email
    firstName
    lastName
    averageRating
  }
}
    `;

export function useRatingPharmQuery(options: Omit<Urql.UseQueryArgs<RatingPharmQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RatingPharmQuery>({ query: RatingPharmDocument, ...options });
};
export const RatingPharmacyDocument = gql`
    query RatingPharmacy($token: String!) {
  ratingPharmacy(token: $token) {
    name
    averageRating
  }
}
    `;

export function useRatingPharmacyQuery(options: Omit<Urql.UseQueryArgs<RatingPharmacyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RatingPharmacyQuery>({ query: RatingPharmacyDocument, ...options });
};
export const ReservationsDocument = gql`
    query Reservations($token: String!) {
  reservations(token: $token) {
    id
    deadline
    code
    originalId
    medicineItem {
      id
      details {
        name
      }
      quantity
    }
    isBought
  }
}
    `;

export function useReservationsQuery(options: Omit<Urql.UseQueryArgs<ReservationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReservationsQuery>({ query: ReservationsDocument, ...options });
};
export const GetScheduleDocument = gql`
    query GetSchedule($token: String!) {
  getSchedule(token: $token) {
    begin
    length
    kind
    patient {
      firstName
      lastName
    }
  }
}
    `;

export function useGetScheduleQuery(options: Omit<Urql.UseQueryArgs<GetScheduleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetScheduleQuery>({ query: GetScheduleDocument, ...options });
};
export const ShopDocument = gql`
    query Shop {
  shop {
    id
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
export const SubscribedPharmaciesDocument = gql`
    query SubscribedPharmacies($token: String!) {
  subscribedPharmacies(token: $token) {
    id
    name
  }
}
    `;

export function useSubscribedPharmaciesQuery(options: Omit<Urql.UseQueryArgs<SubscribedPharmaciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SubscribedPharmaciesQuery>({ query: SubscribedPharmaciesDocument, ...options });
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