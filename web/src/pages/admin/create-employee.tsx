import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, } from "@chakra-ui/react";
import { Wrapper } from "../../components/ui/Wrapper";
import { FormInput } from "../../components/sections/FormInput";
import { FormInputPassword } from "../../components/sections/FormInputPassword";
import { FieldError, useCreateEmployeeMutation } from "../../generated/graphql";
import { useMutation } from "urql";

// @ts-ignore
import { useRouter } from "next/router";
import { Header } from "../../components/sections/Header";
import { toErrorMap } from "../../types";


// ADD WORKING HORUS AS TODO
const CreateEmployee : any = ({}) => {
  const [, createEmployee] = useCreateEmployeeMutation();
  const router = useRouter();

  return (
    <>
      <Header/>
      <Wrapper variant="small">
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            role: "",
          }}
          onSubmit={async (values, { setErrors }): Promise<void> => {
            const response = await createEmployee(values);
            if (response.data?.createEmployee.errors) {
              setErrors(toErrorMap(response.data.createEmployee.errors));
            } else if (response.data?.createEmployee.user) {
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
                <FormInput name="firstName" placeholder="firstName" label="firstName" />
              </Box>
              <Box mt={4}>
                <FormInput name="lastName" placeholder="lastName" label="lastName" />
              </Box>
              <Box mt={4}>
                <FormInput name="role" placeholder="role" label="role" />
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
    </>
    );
}

export default CreateEmployee;

