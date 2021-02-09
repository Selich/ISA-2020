import {
  SimpleGrid,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Select,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { FieldError, useRegisterMutation } from "../../../generated/graphql";
import { FormInput } from "../../sections/FormInput";
import { FormInputPassword } from "../../sections/FormInputPassword";
import swal from "sweetalert";
import { Wrapper } from "../../ui/Wrapper";

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
export default function RegisterLayout({ onClose }) {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          country: "",
          telephone: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));

            console.log(response.data);
          } else {
            router.push("/");
            swal({
              title: "Mail has been sent!",
              text: "Confirm your account!",
              icon: "success",
            });

          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={3} m={-50} mx={-80} spacing={9}>
              <Box m={0} mr={0}>
                <Box mt={5}>
                  <FormInput name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={5}>
                  <FormInputPassword
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Box mt={5}>
                  <FormInputPassword
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                </Box>
              </Box>
              <Box m={0} mr={0}>
                <Box mt={5}>
                  <FormInput
                    name="firstName"
                    placeholder="First Name"
                    label="First Name"
                  />
                </Box>
                <Box mt={5}>
                  <FormInput
                    name="lastName"
                    placeholder="Last Name"
                    label="Last Name"
                  />
                </Box>
                <Box mt={5}>
                  <FormInput
                    name="telephone"
                    placeholder="+38160123456"
                    label="Telephone"
                  />
                </Box>
              </Box>
              <Box m={0} mr={0}>
                <Box mt={5}>
                  <FormInput
                    name="street"
                    placeholder="address"
                    label="Address"
                  />
                </Box>
                <Box mt={5}>
                  <FormInput name="city" placeholder="city" label="City" />
                </Box>
                <Box mt={5}>
                  <FormInput
                    name="country"
                    placeholder="country"
                    label="Country"
                  />
                </Box>
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
