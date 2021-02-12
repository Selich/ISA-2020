import ApolloClient, { gql } from 'apollo-boost'
import { MedicineItem } from '../src/entities/MedicineItem';
import { Prescription } from '../src/entities/Prescription';
import { getEmployee, getPatient, getPharmacy } from '../src/utils/createTestEntities'
import 'cross-fetch/polyfill'

const createUser = gql`
    mutation {
        register(inputs: {
        firstName: "Gbolahan",
        lastNaem: "Test",
        email: "selich.work@gmail.com",
        password: "pass",
        }){
        user {
            password
            email
        }
        }
    }
`;


describe('user creation', () => {
    test('create user', async () => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/',
            onError: (e) => {
                console.log(e)
            }
        });
        await expect(client.mutate({
            mutation: createUser
        }
        ))
    })
})

// describe('test', () => {
//     test('object assignment', async () => {
//         const data = { one: 1, two: 2 };
//         const patient = getPatient()
//         const medicines = [
//             new MedicineItem(),
//             new MedicineItem(),
//             new MedicineItem(),
//         ]
//         const employee = getEmployee()
//         const pharmacy = getPharmacy()
//         const item = await Prescription.save(new Prescription({
//             medicines,
//             patient,
//             employee: null,
//             appointments: null,
//             type: "eprescription",
//             isUsed: false
//         }
//         ))

//         console.log(item);



//         expect(data).toEqual({ one: 1, two: 2 });
//     });
// })
