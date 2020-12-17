import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.date().required(),
  street: yup.string(),
  city: yup.string(),
  country: yup.string(),
  postCode: yup.string(),
  telephoneNumber: yup.string(),
});
