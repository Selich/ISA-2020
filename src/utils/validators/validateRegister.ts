import { RegisterInput } from "src/resolvers/types/UserTypes";

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
