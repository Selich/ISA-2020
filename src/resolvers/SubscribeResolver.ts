import { Subscription } from '../entities/Subscription';
import { ObjectType, Field, Mutation, Resolver, Query, Ctx, Arg} from 'type-graphql';
import { MyContext } from '../types';
import { Pharmacy } from 'src/entities/Pharmacy';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Subscription, { nullable: true })
  user?: Subscription;
}

@Resolver(Subscription)
export class SubscribeResolver{

  @Mutation(() => UserResponse)
  async subscribe(
    @Arg("inputs") inputs: { email: string, pharmacyId: number },
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const subscription = new Subscription()
    // subscription.email = inputs.email
    const pharmacy = await Pharmacy.findOne({ id: inputs.pharmacyId })
    if (!pharmacy) {
      return {
        errors: [ { field: "pharmacy", message: "invalid pharmacy" }],
      };
    }
    subscription.pharmacy = pharmacy

    await subscription.save()

    // return { subscription };
  }

}
