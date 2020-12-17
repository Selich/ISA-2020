import { LoginInput } from "src/resolvers/types/UserTypes";

export const validateLogin = (input: LoginInput) => {
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

  return null;
};

