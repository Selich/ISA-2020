import { isNotEmpty } from "class-validator";
import jwt from "jsonwebtoken";
import { Appointment } from "../entities/Appointment";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Any } from "typeorm";
import { Complaint } from "../entities/Complaint";
import { Employee } from "../entities/Employee";
import { Medicine } from "../entities/Medicine";
import Patient from "../entities/Patient";
import { Pharmacy } from "../entities/Pharmacy";
import { Rating } from "../entities/Rating";
import { Tier } from "../entities/Tier";
import { MyContext } from "../types";
import { ComplaintInput, MedicineInput, PatientInput, RatingInput, SubscriptionInput } from "./types/dtos";

@Resolver(Patient)
export class PatientResolver {

  @Query(() => [Medicine], { nullable: true })
	async allergies( 
		@Arg("token") token: string
	) {
    let temp = jwt.decode(token)
    // @ts-ignore
    let patient = await Patient.findOne({ email: temp.email });
    return patient?.allergies
  }

  @Query(() => [Appointment], { nullable: true })
	async getPatient( 
		@Arg("inputs") inputs: PatientInput
	) {
    let patient = await Patient.findOne({ id: inputs.id });
    let appointments = await Appointment.find({patient: patient})
    return appointments
  }

  @Query(() => Patient, { nullable: true })
	async patient( 
		@Arg("token") token: string
	) {
    console.log(token)
    let temp = jwt.decode(token)
    //@ts-ignore
    let patient = await Patient.findOne({ email: temp.email });
    console.log(patient)
    return patient
  }

  @Query(() => [Patient], { nullable: true })
  async patients(
  ) {
		return await Patient.find({})
  }

  @Query(() => [Patient], { nullable: true })
  async patientsByDoctor(
		@Arg("token") token: string,
		@Arg("inputs") inputs: PatientInput,
  ) {
		if (!inputs) return null

    let temp = jwt.decode(token)
    // @ts-ignore
    // let employee = await Employee.findOne({ email: temp.email });
    let employee = await Employee.findOne({ email: temp.email });
    let appointments = await Appointment.find({ employee: employee})
    let patients = appointments.map(item => item.patient)

    return [ ... new Set(patients)]

  }

  @Query(() => [Tier], { nullable: true })
  async tiers() {
    return await Tier.find({});
  }

  @Mutation(() => Patient, { nullable: true })
  async addAllergie(
    @Arg("inputs") inputs: MedicineInput,
    @Arg("token") token: string,
    @Ctx() { req }: MyContext
  ) {
    let temp = jwt.decode(token)
    let med = await Medicine.findOneOrFail({ name: inputs.name });
    // @ts-ignore
    let user = await Patient.findOneOrFail({ email: temp.email });

    if(user.allergies.length == 0){
      user.allergies = []
    }
    user.allergies.push(med);
    user = await Patient.save(user);
    return user;
  }


  //#3.41
  @Mutation(() => Rating, { nullable: true })
  async addRating(
    @Arg("inputs") inputs: RatingInput,
    @Ctx() { req, res }: MyContext
  ) {
    let user: Patient = req.session.user;
    let userId = 0
    if (inputs.patient)
      //@ts-ignore
      userId = parseInt(inputs.patient.id)
    if (!user)
      user = await Patient.findOneOrFail({ id: userId })

    if (inputs.employee) {

      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
        if (!user.appointments) return null
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      } else if (employee.role === "pharm") {
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      }
      let temp = new Rating();
      temp.employee = employee;
      temp.patient = user
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ employee: employee })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

      employee.averageRating = avg
      employee.save()

      return temp

    } else if (inputs.pharmacy) {
      // ukoliko je jednom rezervisao lek i preuzeo lek
      // ukoliko je dobio eRecept
      //@ts-ignore
      let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })
      if (!user.reservations) return null
      if (!user.ePrescriptions) return null
      let res = user.reservations.find((item) =>
        (item.pharmacy.id == pharmacy.id) && (item.isBought));
      if (!res) return null;
      let etemp = user.ePrescriptions.find((item) => item.pharmacy.id == pharmacy.id);
      if (!etemp) return null;
      let temp1 = user.appointments.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp1) return null;
      let temp = new Rating();
      temp.pharmacy = pharmacy;
      temp.patient = user
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ pharmacy: pharmacy })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

      pharmacy.averageRating = avg
      pharmacy.save()

      return temp

    } else if (inputs.medicine) {

      let medicine = await Medicine.findOneOrFail({ code: inputs.medicine.code })
      let temp = new Rating();
      temp.medicine = medicine;
      temp.patient = user
      if (inputs.rating) temp.rating = inputs.rating

      temp.save();
      let ratings = await Rating.find({ medicine: medicine })
      //@ts-ignore
      let avg = ratings.reduce((a, b) => a.rating + b.rating) / ratings.length

      medicine.rating = avg
      medicine.save()

      return temp


    }
    return null
  }
  // 3.40
  @Mutation(() => Complaint, { nullable: true })
  async addComplaint(
    @Arg("inputs") inputs: ComplaintInput,
    @Ctx() { req, res }: MyContext
  ) {
    let user: Patient = req.session.user;
    let userId = 0
    if (inputs.patient)
      //@ts-ignore
      userId = parseInt(inputs.patient.id)
    if (!user)
      user = await Patient.findOneOrFail({ id: userId })

    if (inputs.employee) {
      let employee = await Employee.findOneOrFail({
        email: inputs.employee.email,
      });
      if (employee.role === "derm") {
        // ukoliko je bio kod dermatologa
        if (!user.appointments) return null
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      } else if (employee.role === "pharm") {
        let res = user.appointments.find((item) => item.employee === employee);
        if (!res) return null;
      }
      let complaint = new Complaint();
      complaint.employee = employee;
      complaint.patient = user
      if (inputs.description) complaint.description = inputs.description;


      complaint.save();
      return complaint

    } else if (inputs.pharmacy) {
      // ukoliko je jednom rezervisao lek i preuzeo lek
      // ukoliko je dobio eRecept
      //@ts-ignore
      let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })
      if (!user.reservations) return null
      if (!user.ePrescriptions) return null
      let res = user.reservations.find((item) =>
        (item.pharmacy.id == pharmacy.id) && (item.isBought));
      if (!res) return null;
      let temp = user.ePrescriptions.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp) return null;
      let temp1 = user.appointments.find((item) => item.pharmacy.id == pharmacy.id);
      if (!temp1) return null;
      let complaint = new Complaint();
      complaint.pharmacy = pharmacy;
      complaint.patient = user
      if (inputs.description) complaint.description = inputs.description;
      complaint.save();

      return complaint
    }

    return null
  }
  @Mutation(() => Patient, { nullable: true })
  async unsubscribe(
    @Arg("inputs") inputs: SubscriptionInput,
    @Ctx() { req }: MyContext) {
    let user = req.session.user
    if (!user) {
      if (inputs.patient)
        user = await Patient.findOneOrFail({ email: inputs.patient.email })
    }
    if (!inputs.pharmacy?.id) return null

    let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })

    if (!pharmacy.subscribers) pharmacy.subscribers = []

    //@ts-ignore
    user.subscriptions = user.subscriptions.filter(item => item.id !== pharmacy.id)
    user.save()
    pharmacy.subscribers = pharmacy.subscribers.filter(item => item.id !== user.id)
    pharmacy.save()


    return user

  }



  @Mutation(() => Patient, { nullable: true })
  async subscribe(
    @Arg("inputs") inputs: SubscriptionInput,
    @Ctx() { req }: MyContext) {
    let user = req.session.user
    if (!user) {
      if (inputs.patient)
        user = await Patient.findOneOrFail({ email: inputs.patient.email })
    }
    if (!inputs.pharmacy?.id) return null

    let pharmacy = await Pharmacy.findOneOrFail({ id: inputs.pharmacy.id })

    if (!pharmacy.subscribers) pharmacy.subscribers = []

    user.subscriptions.push(pharmacy)
    user.save()
    pharmacy.subscribers.push(user)
    pharmacy.save()


    return user

  }

  @Mutation(() => Rating, { nullable: true })
  async rate(
    @Arg("inputs") inputs: RatingInput,
		@Ctx() { req }: MyContext) 
	{
		if(!inputs) return null
		if(!inputs.rating) return null
		let patient = null
    if (inputs.patient){
        patient = await Patient.findOneOrFail({ email: inputs.patient.email })
    }
		if(!patient) return null

		let rating = new Rating()
		rating.patient = patient
		rating.rating = inputs.rating

		if(inputs.employee){
			let employee = await Employee.findOneOrFail({ email: inputs.employee.email })
			rating.employee = employee


			let average = employee.schedule
			let avg = 0
			average.forEach(item => avg += item.score )
			avg = avg / average.length


			console.log(avg)

			employee.averageRating = avg
			employee.save()

			rating.save()

		}



    return rating

  }


}
