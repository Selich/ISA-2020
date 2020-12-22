
import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './../../components/sections/FormInput';
import { FormInputPassword } from './../../components/sections/FormInputPassword';
import { Wrapper }  from './../../components/ui/Wrapper';
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useMutation } from 'urql';
import { FieldError, useLoginMutation } from '../../generated/graphql';


interface IFormInputs {
  email: string
  password: string
}
const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};


export default function LoginForm({onClose}) {
  const [{ fetching: loginFetch }, login] = useLoginMutation();
  const router = useRouter();
  return (
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);

            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
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
              <Button
                mt={8}
                size="md"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
              Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}
