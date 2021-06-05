import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import { Pharmacy } from "../entities/Pharmacy";
import { Prescription } from "../entities/Prescription";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AppointmentInput, MedicineInput, MedicineItemInput, PatientInput, PharmacyInput, PrescriptionInput, UserInput } from "./types/dtos";
import { MedicineDetailsInput } from "./types/MedicineTypes";
import User from "../entities/User";
import { Employee } from "../entities/Employee";
import { Appointment } from "../entities/Appointment";
import { MedicineItem } from "../entities/MedicineItem";

@Resolver(Prescription)
export class PrescriptionResolver {

  @Query(() => [Medicine], { nullable: true })
  async getMedicineForPatient(
    @Arg("patientInput") patientInput: UserInput,
    @Arg("pharmacyInput") pharmacyInput: PharmacyInput,
    @Ctx() { req, res }: MyContext
  ) {

    if(!patientInput) return null
    if(!pharmacyInput) return null


    let patient = await Patient.findOneOrFail({id: patientInput.id})
    let pharm = await Pharmacy.findOneOrFail({id: pharmacyInput.id})

    let alergies = patient.allergies
    let medicines = pharm.inventory.medicines.map(item => item.details)

    console.log(medicines)

    return medicines

  }
  @Mutation(() => Prescription, { nullable: true })
  async notVisited(
    @Arg("appointmentInputs") appointmentInputs: AppointmentInput,
    @Arg("prescriptionInputs") prescriptionInputs: PrescriptionInput,
    @Ctx() { req, res }: MyContext
  ) {
  }

  @Mutation(() => Prescription, { nullable: true })
  async createPrescription(
    @Arg("appointmentInputs") appointmentInputs: AppointmentInput,
    @Arg("medicineInput") medicineInput: MedicineItemInput,
    @Ctx() { req, res }: MyContext
  ) {

    if(!medicineInput) return null

    let medicine = null
    // @ts-ignore
    let appointment = await Appointment.findOneOrFail({id: appointmentInputs.id})

    // @ts-ignore

    // @ts-ignore
    let details = await Medicine.findOneOrFail({id: medicineInput.details.id})
    let pharm = await Pharmacy.findOne({id: appointment.id})

    if(!details) return null

    // @ts-ignore
    medicine = pharm?.inventory.medicines.find(item => item.details == details)
    // todo: handle message
    if(!medicine) return null

    let prescription = new Prescription()

    if(appointmentInputs.report)
      appointment.report = appointmentInputs.report
    
    appointment.isVisited = true
    appointment.save()
    

    prescription.patient = await Patient.findOneOrFail({id: appointment.patient?.id})
    prescription.employee = await Employee.findOneOrFail({id: appointment.employee?.id})
    prescription.medicines = []
    prescription.medicines.push(medicine)
    prescription.save()

  }

}
