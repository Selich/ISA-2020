import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './FormInput';
import { Wrapper }  from '../ui/Wrapper';
import { FormInputPassword } from './FormInputPassword';
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


export default function RegisterForm() {
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
              <FormInput
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <FormInput name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <FormInputPassword
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}

