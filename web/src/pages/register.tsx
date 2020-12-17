import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './../components/sections/FormInput';
import { FormInputPassword } from './../components/sections/FormInputPassword';
import { Wrapper }  from './../components/ui/Wrapper';
import { Formik, Form } from "formik";


import { useRouter } from "next/router";


// @ts-ignore
import DateInput from '@opuscapita/react-dates'


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


export default function Register() {
  const [date, setDate] = useState(new Date())
  const router = useRouter();
  return (
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={() => console.log("test")}
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
                <FormInputPassword name="confirmPassword" placeholder="password" label="Confirm Password" type="password" />
              </Box>
              <Box mt={4}>
                <FormInput name="firstName" placeholder="firstName" label="First Name" />
              </Box>
              <Box mt={4}>
                <FormInput name="lastName" placeholder="lastName" label="Last Name" />
              </Box>
              <Box mt={4}>
                <FormInput name="telephone" placeholder="+381 12345678" label="Telephone" />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}


