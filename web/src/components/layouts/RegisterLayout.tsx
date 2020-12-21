import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import  { useRouter } from 'next/router';
import React from 'react'
import { FieldError, useRegisterMutation } from '../../generated/graphql';
import register from '../../pages/register';
import { FormInput } from '../sections/FormInput';
import { FormInputPassword } from '../sections/FormInputPassword';
import { Wrapper } from '../ui/Wrapper';

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
export default function RegisterLayout() {
  const [, register] = useRegisterMutation();
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
  )
}
