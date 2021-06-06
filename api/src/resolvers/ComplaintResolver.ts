import { Complaint } from "../entities/Complaint";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ComplaintInput } from "./types/dtos";
import Patient from "../entities/Patient";
import jwt from 'jsonwebtoken'
import { Employee } from "../entities/Employee";

@Resolver()
export class ComplaintResolver {

	@Query(() => [Complaint], { nullable: true })
	async complaints() {
		return await Complaint.find({ })

	}

	@Query(() => [Employee], { nullable: true })
	async employeesComplaint() {
		return await Complaint.find({ })

	}

	@Query(() => [Complaint], { nullable: true })
	async complaintsPatient(
		@Arg('token') token: string,
  ) {
		let temp = jwt.decode(token)
		if (!temp) return null
    // @ts-ignore
    let patient = await Patient.findOneOrFail({id: temp.id})
		return await Complaint.find({patient: patient })
	}
	@Mutation(() => Complaint, { nullable: true })
	async createComplaint(
		@Arg('inputs') inputs: ComplaintInput,
  ) {
		return await Complaint.find({ })
	}
	@Mutation(() => Complaint, { nullable: true })
	async answerComplaint(
		@Arg('inputs') inputs: ComplaintInput,
  ) {
		return await Complaint.find({ })

	}
}
