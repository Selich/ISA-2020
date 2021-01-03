import { Box, Button, FormControl, FormLabel, Grid, Select } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { FieldError, useRegisterMutation } from '../../../generated/graphql';
import { FormInput } from '../../sections/FormInput';
import { FormInputPassword } from '../../sections/FormInputPassword';
import { Wrapper } from '../../ui/Wrapper';

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
export default function CreateEmployeeForm({ onClose }) {
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
          gender: "",
          dateOfBirth: "",
          address: {}
        }}
        onSubmit={async (values, { setErrors }) => {
        //   let { street, city, country } = values
        //   values.address = { street, city, country }
        //   const response = await register(values);
        //   if (response.data?.register.errors) {
        //     setErrors(toErrorMap(response.data.register.errors));
        //   } else if (response.data?.register.user) {
        //     router.push("/");
        //   }
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
            <Grid templateColumns="repeat(2, 1ft)" gap={2}>
              <Box w="100%" mt={4}>
                <FormInput name="firstName" placeholder="firstName" label="First Name" />
              </Box>
              <Box mw="100%" t={4}>
                <FormInput name="lastName" placeholder="lastName" label="Last Name" />
              </Box>

            </Grid>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" label="gender" placeholder="Select option">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <Box mt={4}>
              <FormInput name="street" placeholder="street" label="Street" />
            </Box>
            <Box mt={4}>
              <FormInput name="city" placeholder="city" label="City" />
            </Box>
            <Box mt={4}>
              <FormInput name="country" placeholder="country" label="Country" />
            </Box>
            <Box mt={4}>
              <FormInput name="telephone" placeholder="telephone" label="Telephone" />
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
