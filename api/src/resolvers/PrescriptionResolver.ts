import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import { Pharmacy } from "../entities/Pharmacy";
import { Prescription } from "../entities/Prescription";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AppointmentInput, MedicineInput, MedicineItemInput, PatientInput, PharmacyInput, PrescriptionInput, UserInput } from "./types/dtos";
import { Appointment } from "../entities/Appointment";
import jwt from "jsonwebtoken";

@Resolver(Prescription)
export class PrescriptionResolver {

  @Query(() => [Prescription], { nullable: true })
  async getPrescriptionsByPatient(
    @Arg("token") token: string
  ) {
    let temp = jwt.decode(token)
    // @ts-ignore
    let patient = await Patient.findOne({ email: temp.email });
    return patient?.prescritions
  }

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

  @Mutation(() => Prescription)
  async createPrescription(
    @Arg("appointmentInputs") appointmentInputs: AppointmentInput,
    @Arg("medicineInput") medicineInput: MedicineItemInput,
  ) {


    // @ts-ignore
    let appointment = await Appointment.findOneOrFail({id: appointmentInputs.id})
    console.log(appointment)
    // @ts-ignore

    let prescription = new Prescription()
    // @ts-ignore
    if(medicineInput.details.id){
       // @ts-ignore
      let details = await Medicine.findOne({id: medicineInput.details.id})
      if(!details) return null
      let medicine = appointment.pharmacy.inventory.medicines.find(item => item.details == details)
      if(!prescription.medicines)
        prescription.medicines = []
      if(medicine)
        prescription.medicines.push(medicine)
    }

    if(appointmentInputs.report)
      appointment.report = appointmentInputs.report
    
    appointment.isVisited = true

    
    appointment.save()

    let patient = appointment.patient
    patient.score += appointment.score
    patient.save()
    
    prescription.appointment = appointment
    prescription.patient = appointment.patient
    let date = new Date()
    prescription.deadline = new Date(date.setMonth(date.getMonth()+8));
    prescription.employee = appointment.employee
    
    prescription.save()
    return prescription

  }

}
