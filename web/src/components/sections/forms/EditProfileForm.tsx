import { SimpleGrid, Box, Button, FormControl, FormLabel, Grid, Select } from '@chakra-ui/react';
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
export default function EditProfileForm({ onClose }) {
	//const [, updateProfile] = useRegisterMutation();
  const router = useRouter();
	let	user = localStorage.getItem('user')
 	user = JSON.parse(user)
	let address = user.address
	if(!address) {
		address = {}
		address.street = ''
		address.city = ''
		address.country = ''
	} else {
		address = user.address

	}
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
					email: user.email,
          password: "",
          confirmPassword: "",
          firstName: user.firstName,
          lastName: user.lastName,
          street: address.street,
          city: address.city,
          country: address.country,
          telephone: user.telephone,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            console.log(response.data);
            router.push("/");
          }
        }}
      >

        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={3} m={-50} mx={-80} spacing={9} >
                <Box m={0} mr={0} >
						<Box mt={5}>
							<FormInput name="email" placeholder="Email" label="Email" disabled />
						</Box>
            <Box mt={5}>
              <FormInputPassword name="password" placeholder="password" label="Password" type="password" />
            </Box>
            <Box mt={5}>
              <FormInputPassword name="confirmPassword" placeholder="confirmPassword" label="Confirm Password" type="password" />
            </Box>
            </Box>
             <Box m={0} mr={0} >
								<Box mt={5}>
									<FormInput name="firstName" placeholder="First Name" label="First Name" />
								</Box>
								<Box mt={5}>
									<FormInput name="lastName" placeholder="Last Name" label="Last Name" />
								</Box>
								<Box mt={5}>
									<FormInput name="telephone" placeholder="+38160123456" label="Telephone" />
								</Box>
            </Box>
             <Box m={0} mr={0} >
								<Box mt={5}>
									<FormInput name="street" placeholder="address" label="Address" />
								</Box>
								<Box mt={5}>
									<FormInput name="city" placeholder="city" label="City" />
								</Box>
								<Box mt={5}>
									<FormInput name="county" placeholder="country" label="Country" />
								</Box>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Update
              </Button>
					</SimpleGrid>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
