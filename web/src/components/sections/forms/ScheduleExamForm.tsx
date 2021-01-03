
import { Box, Button, Flex, Select, SimpleGrid, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { FormInput } from './../../../components/sections/FormInput';
import { Wrapper }  from './../../../components/ui/Wrapper';
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { toErrorMap } from '../../../utils/errorMap';

export default function ScheduleExamForm({onClose}) {
  const router = useRouter();
  return (
      <SimpleGrid columns={2} gap={2}>
          <Box>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <FormInput name="email" placeholder="email" label="Email" />
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
    </Box>
          <Box>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <FormInput name="email" placeholder="email" label="Email" />
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
    </Box>
      </SimpleGrid>
    );
}
