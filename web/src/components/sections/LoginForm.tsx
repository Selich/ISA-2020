
import { Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from './../../components/sections/FormInput';
import { FormInputPassword } from './../../components/sections/FormInputPassword';
import { Wrapper }  from './../../components/ui/Wrapper';
import { Formik, Form } from "formik";


import { useRouter } from "next/router";


// @ts-ignore
import DateInput from '@opuscapita/react-dates'


interface IFormInputs {
  email: string
  password: string
}


export default function LoginForm(props) {
  const [date, setDate] = useState(new Date())
  // const [, login] = useLoginMuatation();
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
              <Button
                mt={4}
                type="submit"
                onClick={props.onClose}
                isLoading={isSubmitting}
                variantColor="teal"
              >
              Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}
