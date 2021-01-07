import { Employee } from "../entities/Employee"
import Patient from "../entities/Patient"
import { Pharmacy } from "../entities/Pharmacy"
import { Address } from "../entities/Address"
import { Appointment } from "../entities/Appointment"

export async function getAddress() {

    return await Address.save(new Address({
        street: "poenkareova 22", city: "city", country: "country"
    }))
}
export async function getEmployee() {

        return await Employee.save(new Employee({
            email: 'derm@gmail', password: 'pass', firstName: 'Nikola', lastName: 'Selic'
        }))
}
export async function getPatient() {

        return await Patient.save(new Patient({
            email: 'user@gmail', password: 'pass', firstName: 'Nikola', lastName: 'Selic'
        }))
}
export async function getPharmacy() {
    const address =  await Address.save(new Address({
        street: "poenkareova 22", city: "city", country: "country"
    }))

        return await Pharmacy.save(new Pharmacy({
            address, name: "Pharmacy 1"
        }))
}
export async function getAppointemnt() {
    const employee = getEmployee()
    const patient = getPatient()
    const pharmacy  = getPharmacy()

        return await Appointment.save(new Appointment({
            patient, employee, pharmacy,
            from: new Date("12/12/2012 13:14"),
            until: new Date("12/12/2012 14:14"),
        }))
}



