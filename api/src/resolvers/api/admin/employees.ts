import { User } from '../../../entities/User';
import { ObjectType, Field, Mutation, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { MyContext } from '../../../types';
import { UserResponse, EmployeeInput, LoginInput, RegisterInput, HolidayInput } from '../../types/UserTypes';
import argon2 from 'argon2';
import { validateAdmin, validateRegister } from '../../../utils/validators/validateRegister';
import { getRepository } from 'typeorm';
import { WorkingHours } from '../../../entities/WorkingHours';
import { Holiday } from 'src/entities/Holiday';


@Resolver(User)
export class EmployeeResolver {
  // ME
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    return (!req.session.userId)
    ? null
    : await User.findOne({ id: req.session.userId });
  }


  @Mutation(() => UserResponse)
  async createEmployee(
    @Arg("inputs") inputs: EmployeeInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const errors = validateAdmin(req.session.userId);
    // if (errors) { return errors; }

    const user = new User();
    const hashedPassword = await argon2.hash(inputs.firstName);
    user.email = inputs.email;
    user.password = hashedPassword
    user.role = inputs.role;
    user.firstName = inputs.firstName;
    user.lastName = inputs.lastName;
    const wh = new WorkingHours()
    const list : WorkingHours[] = []
    const newUser = await user.save()
    wh.doctorID = newUser.id
    wh.pharmacyID = 1
    const l = list.concat(wh)

    newUser.workingHours = l
    return { user };
  }

  @Mutation(() => UserResponse)
  async handleHolidays(
    @Arg("inputs") inputs: HolidayInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const errors = validateAdmin(req.session.userId);
    const user = await User.findOneOrFail(inputs.employeeId)
    if(!user){
      return {
        errors: [{ field: "email", message: "not an admin" }],
      };
    }
    const holiday = new Holiday()
    holiday.from = new Date(inputs.from)
    holiday.until = new Date(inputs.until)
    holiday.employee = user

    return { user }

  }
}
