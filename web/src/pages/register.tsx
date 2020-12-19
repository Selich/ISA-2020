import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Wrapper } from "../components/ui/Wrapper";
import { FormInput } from "../components/sections/FormInput";
import { FormInputPassword } from "../components/sections/FormInputPassword";
import { FieldError, useRegisterMutation } from "../generated/graphql";
import { useMutation } from "urql";


// @ts-ignore
import DateInput from '@opuscapita/react-dates'
import router from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";

interface IFormInputs {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: Date
  street: string,
  city: string,
  country: string
  postCode: string,
  telephoneNumber: string,
}
const REGISTER_MUT = `
mutation Register($email: String!, $password: String!, $confirmPassword: String!) {
  register(inputs: { email: $email, password: $password, confirmPassword: $confirmPassword }) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
`;

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
interface registerProps {}

const Register : React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  const router = useRouter();

  return (
      <Wrapper variant="small">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >

          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <FormInput name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <FormInputPassword name="password" placeholder="password" label="Password" type="password" />
              </Box>
              <Box mt={4}>
                <FormInputPassword name="confirmPassword" placeholder="confirmPassword" label="Confirm Password" type="password" />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}


export default Register;
