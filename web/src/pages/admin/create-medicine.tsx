
//  istorija kupljenih lekova -> patient
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/next-server/lib/router/router";
import React from "react";
import { FormInput } from "../../components/sections/FormInput";
import { FormInputPassword } from "../../components/sections/FormInputPassword";
import { Header } from "../../components/sections/Header";
import { Wrapper } from "../../components/ui/Wrapper";
import { useCreateMedicineMutation } from "../../generated/graphql";
import register from "../register";


interface IFormInputs {
  email: string
  password: string
}


export default function CreateMedicine() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ fetching: createFetch }, create] = useCreateMedicineMutation();
  return (
    <>
      <Header />
      <Wrapper variant="small">
        <Formik
          initialValues={{
            code: "",
            name: "",
            type: "",
            points: 0,
            form: "",
            contents: "",
            producer: "",
            info: ""
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await create(values);
          }}
        >

          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <FormInput name="code" placeholder="code" label="code" />
              </Box>
              <Box mt={4}>
                <FormInput name="name" placeholder="name" label="name" />
              </Box>
              <Box mt={4}>
                <FormInput name="type" placeholder="type" label="type" />
              </Box>
              <Box mt={4}>
                <FormInput name="points" placeholder="points" label="points" />
              </Box>
              <Box mt={4}>
                <FormInput name="form" placeholder="form" label="form" />
              </Box>
              <Box mt={4}>
                <FormInput name="contents" placeholder="contents" label="contents" />
              </Box>
              <Box mt={4}>
                <FormInput name="producer" placeholder="producer" label="producer" />
              </Box>
              <Box mt={4}>
                <FormInput name="info" placeholder="info" label="info" />
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
