import { Employee } from "../entities/Employee";
import { EPrescription } from '../entities/EPrescription'
import { MyContext } from "../types";
import { Query, Ctx, Resolver, Mutation, Arg } from "type-graphql";
import qrcode from 'qrcode'
import { Prescription } from "../entities/Prescription";
import { MedicineListDTO } from "./types/dtos";
import Patient from "../entities/Patient";

@Resolver()
export class EPrescriptionResolver {

    @Query(() => [Prescription], { nullable: true })
    async eprescriptions(
        @Ctx() { req }: MyContext
    ) {
        await EPrescription.find({id: req.session.userId})
    }

    @Mutation(() => Prescription, { nullable: true })
    async generateEPrescription(
        @Arg("inputs") inputs: MedicineListDTO,
        @Ctx() { req, mailer }: MyContext
    ) {
        const patient = await Patient.findOneOrFail({ id: req.session.userId})
        const item = await Prescription.save(new Prescription(
            { medicines: inputs.list, patient, employee: null, appointments: null, type:"eprescription", isUsed:false }
        ))

        const token = qrcode.create(item.hashCode, {})
        const pathToFile = "../../../docs/"
        await qrcode.toFile(pathToFile + item.hashCode + ".png", item.hashCode)
        const email = await mailer.mailer?.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "selich.work@gmail.com", // list of receivers
            // to: patient.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
            attachments: [{
                filename:  item.hashCode + ".png",
                path: pathToFile,
                cid: 'unique@kreata.ee' //same cid value as in the html img src
            }]
        })


    }
    @Mutation(() => Prescription, { nullable: true })
    async readEPrescription(
        @Ctx() { req }: MyContext
    ) {
        return await Employee.find({})
    }
}
