import User from "src/entities/User";
// import { LoginInput, UserDTO } from "../../resolvers/types/UserTypes";
import argon2 from 'argon2';

// export const validateLogin = async (input: UserDTO, user: User) => {
//     if (!user) {
//       return {
//         errors: [{ field: "email", message: "that email doesn't exist" }],
//       };
//     }
//     const valid = await argon2.verify(user.password, input.password);

//     if (!valid) {
//       return {
//         errors: [{ field: "email", message: "that email doesn't exist" }],
//       };
//     }
//   return []

// };

