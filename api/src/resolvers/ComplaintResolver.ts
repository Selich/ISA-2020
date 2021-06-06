import { Complaint } from "../entities/Complaint";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ComplaintInput } from "./types/dtos";
import Patient from "../entities/Patient";
import jwt from 'jsonwebtoken'
import { Employee } from "../entities/Employee";
import { getConnection } from "typeorm";
import { sendComplaintAnswer, sendVerificationMail } from "../utils/sendMail";
import { MyContext } from "../types";

@Resolver()
export class ComplaintResolver {

  @Query(() => [Complaint], { nullable: true })
  async complaints() {
    return await Complaint.find({})

  }

  @Query(() => [Employee], { nullable: true })
  async employeesComplaint() {
    return await Complaint.find({})

  }

  @Query(() => [Complaint], { nullable: true })
  async complaintsPatient(
    @Arg('token') token: string,
  ) {
    let temp = jwt.decode(token)
    if (!temp) return null
    // @ts-ignore
    let patient = await Patient.findOne({ id: temp.id })
    let comp = await Complaint.find({ patient: patient })
    if (!comp) return []
    else return comp
  }
  @Mutation(() => Complaint, { nullable: true })
  async createComplaint(
    @Arg('inputs') inputs: ComplaintInput,
  ) {
    return await Complaint.find({})
  }
  @Mutation(() => Complaint, { nullable: true })
  async answerComplaint(
    @Arg('inputs') inputs: ComplaintInput,
    @Ctx() { mailer }: MyContext
  ) {
    if (!inputs) return null

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    // @ts-ignore
    try {
      if(!inputs.id) return null
      let comp = await Complaint.findOneOrFail({ id: inputs.id })
      if(!inputs.patient) return null
      let patient = await Patient.findOneOrFail({id: inputs.patient.id})

      if(!inputs.answer) return null
      sendComplaintAnswer(patient, inputs.answer, mailer)

      await queryRunner.manager.remove(comp);
      await queryRunner.commitTransaction();
      return comp
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return null
    } finally {
      await queryRunner.release();
    }
  }
}
