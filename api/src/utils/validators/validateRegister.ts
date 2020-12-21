import { User } from "../../entities/User";
import { RegisterInput } from "../../resolvers/types/UserTypes";

export const validateRegister = (input: RegisterInput) => {
  if (!input.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (input.password !== input.confirmPassword) {
    return [
      {
        field: "password",
        message: "password not confirmed",
      },
    ];
  }
  return null;
};

export const validateAdmin = async (userId: any) => {
  const admin = await User.findOne({ id: userId} )
  if(!admin || admin.role !== 'sysadmin'){
      return {
        errors: [{ field: "email", message: "not an admin" }],
      };
  }
  return null;
};
