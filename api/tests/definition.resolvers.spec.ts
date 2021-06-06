import { AuthResolver } from '../src/resolvers/auth';
import { buildSchema } from 'type-graphql';
import { AppointmentResolver } from '../src/resolvers/AppointmentResolver';
import { EmployeeResolver } from '../src/resolvers/EmployeeResolver';
import { ReservationResolver } from '../src/resolvers/ReservationResolver';
import { MedicineResolver } from '../src/resolvers/MedicineResolver';
import { PharmacyResolver } from '../src/resolvers/PharmacyResolver';
import { PrescriptionResolver } from '../src/resolvers/PrescriptionResolver';
import { PatientResolver } from '../src/resolvers/PatientResolver';
import { RateResolver } from '../src//resolvers/RateResolver';
import { ComplaintResolver } from '../src/resolvers/ComplaintResolver';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import dbConfig from '../src/ormconfig'
import { Medicine } from '../src/entities/Medicine';
import { Address } from '../src/entities/Address';
import { Appointment } from '../src/entities/Appointment';
import { AppointmentDefinition } from '../src/entities/AppointmentDefinition';
import { Complaint } from '../src/entities/Complaint';
import { Employee } from '../src/entities/Employee';
import { EPrescription } from '../src/entities/EPrescription';
import { Holiday } from '../src/entities/Holiday';
import { Inventory } from '../src/entities/Inventory';
import { MedicineItem } from '../src/entities/MedicineItem';
import { MedicineList } from '../src/entities/MedicineList';
import { MedicineRequest } from '../src/entities/MedicineRequest';
import { Model } from '../src/entities/Model';
import Patient from '../src/entities/Patient';
import { Pharmacy } from '../src/entities/Pharmacy';
import { Prescription } from '../src/entities/Prescription';
import { Price } from '../src/entities/Price';
import { Rating } from '../src/entities/Rating';
import { Reservation } from '../src/entities/Reservation';
import { Tier } from '../src/entities/Tier';
import User from '../src/entities/User';
import { WorkingHours } from '../src/entities/WorkingHours';

const query = `
query Definitions{
  definitions{
    kind
    price
    score
  }
}
`;

// @ts-ignore
describe('Appointment Definitions Test', () => {
  // @ts-ignore
  test("Get appointment definitions", async () => {
    const conn = await createConnection({
      ...dbConfig,
      entities: [Medicine, MedicineRequest, Patient, MedicineItem, Address, Appointment, AppointmentDefinition, Complaint, Employee, EPrescription, Holiday, Inventory, MedicineList, Model, Pharmacy, Prescription, Price, Rating, Reservation, Tier, User, WorkingHours]
    });
    conn.runMigrations()
    const server = new ApolloServer({
      // @ts-ignore
      schema: await buildSchema({
        resolvers: [ComplaintResolver, RateResolver, PatientResolver, EmployeeResolver, MedicineResolver, AuthResolver, PharmacyResolver, AppointmentResolver, ReservationResolver, PrescriptionResolver],
        validate: false
      }),
      // @ts-ignore
      context: ({ req, res }) => ({
        req, res, conn
      })
    });
    let res = await server.executeOperation({ query: query })
    // @ts-ignore
    expect(res.data.definitions).toMatchObject(original);

  });
});

let original = [
    {
      "kind": "pharm",
      "price": 8,
      "score": 8
    }
]