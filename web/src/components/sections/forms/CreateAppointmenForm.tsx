
import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './../../../components/sections/FormInput';
import { FormInputPassword } from './../../../components/sections/FormInputPassword';
import { Wrapper }  from './../../../components/ui/Wrapper';
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FieldError, useLoginMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/errorMap';


export default function CreateAppointmentForm({onClose}) {
  const [{ fetching: loginFetch }, login] = useLoginMutation();
  const router = useRouter();
  return (
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            // @ts-ignore
            if (response.data?.login.errors) {
            // @ts-ignore
              console.log(response.data.login.errors);
            // @ts-ignore
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              let user = response.data.login.user
            // @ts-ignore
              // router.push(`/${user.role}/${user.id}`);
              onClose()
              router.reload()
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
