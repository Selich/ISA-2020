import { Field } from "type-graphql";
import { Entity } from "typeorm/decorator/entity/Entity";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
import { MedicineList } from "./MedicineList";
import { Pharmacy } from "./Pharmacy";
import { User } from "./User";

@Entity()
export class Inventory extends MedicineList{

  @Field(() => User)
  @OneToOne(() => User)
  supplier: User;

  @Field(() => Pharmacy)
  @OneToOne(() => Pharmacy,item=>item.inventory)
  pharmacy: Pharmacy;


}
