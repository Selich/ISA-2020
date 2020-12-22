import {Resolver, Query, Ctx, Arg, Mutation, Field, ObjectType} from 'type-graphql';
import { MyContext } from '../../../types';
import { Medicine } from '../../../entities/Medicine';
import { MedicineItem } from '../../../entities/MedicineItem';
import { FieldError } from '../../types/ErrorTypes';
import { PatientDetails } from '../../../entities/PatientDetails';
import { Reservation } from 'src/entities/Reservation';
import { Pharmacy } from 'src/entities/Pharmacy';
import { Inventory } from 'src/entities/Inventory';

@ObjectType()
class MedicineResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Medicine, { nullable: true })
  details?: Medicine;
}
@Resolver(Medicine)
export class MedicineResolver{
  @Mutation(() => Reservation)
  async reservation(
    @Arg("inputs") inputs: Reservation,
    @Ctx() { req }: MyContext
  ): Promise<Reservation> {

    const profile = await PatientDetails.getRepository()
                          .createQueryBuilder('patient_details')
                          .leftJoinAndSelect("patient_details.user", "user")
                          .where("user.id = :id", { id: req.session.userId })
                          .getOneOrFail()


    const list = inputs.medicines
    const arr : any[]= []
    list.forEach(item => arr.push(item.id))

    const pharmInv = Inventory.findOneOrFail({pharmacy: inputs.pharmacy})
    const items = (await pharmInv).medicines.filter(item => arr.includes(item.id))

    inputs.medicines = items
    inputs.patient = profile
    await inputs.save()

    return inputs ;
  }
}
