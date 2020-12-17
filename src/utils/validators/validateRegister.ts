import { RegisterInput } from "src/resolvers/types/UserTypes";

export const validateRegister = (input: RegisterInput) => {
  // TODO: Add regex for email @dusan0098
  // TODO: Add validation for roles @dusan0098 @Selich
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

  if (!(input.gender.toLowerCase() in ['male', 'female', 'other'])) {
    return [
      {
        field: "gender",
        message: "not a valid gender",
      },
    ];
  }
  return null;
};
