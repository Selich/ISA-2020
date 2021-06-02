import {Connection} from "typeorm";
import {graphqlTestCall} from "./graphqlTestCall";
import {createTestConn} from "./createTestConn";

const  Patient =require( "../src/entities/Patient");
const  PatientResolver =require("../src/resolvers/PatientResolver");
const  Pharmacy = require( '../src/entities/Pharmacy');



let conn:Connection;

beforeAll(async () => {
    conn = await createTestConn();
});
  
afterAll(async () => {
    await conn.close();
});

test('check if getAll patients works for patientResolver',async()=>{
const resolver =  PatientResolver();
const patientList = await resolver.patients();
expect(patientList.length).toBeGreaterThan(0); 
});