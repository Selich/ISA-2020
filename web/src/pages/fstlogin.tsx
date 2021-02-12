import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FormInputPassword } from "./../components/sections/FormInputPassword";
import { FormInput } from "./../components/sections/FormInput";
import { Wrapper } from "./../components/ui/Wrapper";
import { toErrorMap } from '../utils/errorMap';
import { useConfirmPasswordMutation } from "../generated/graphql";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import { Box, Button, Text, SimpleGrid } from "@chakra-ui/react";

import { MyCalendar } from "../components/sections/Calendar";

export default function FstLogin() {
  const [data, setData] = useState({});
  const [, confirmPassword] = useConfirmPasswordMutation();
  const router = useRouter();

  useEffect(() => {

  }, []);
  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
        <SimpleGrid columns={3} spacing={0} maxH="600px">
          <Box align="left"> </Box>
          <Box align="center">
            <Wrapper variant="small">
              <Formik
                initialValues={{ oldPass: "", passsword: "", confirmPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await confirmPassword(values);

                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    let user = response.data.login.user;
                    let token = response.data.login.token;
                    sessionStorage.setItem("token", JSON.stringify(token));
                  }
                }}
							>
					{({ isSubmitting }) => (
						<Form>
							<Box mt={4}>
								<FormInput name="oldPass" placeholder="Code" label="Code" />
							</Box>
							<Box mt={4}>
								<FormInputPassword name="password" placeholder="password" label="Password" type="password" />
							</Box>
							<Box mt={4}>
								<FormInputPassword name="confirmPassword" placeholder="confirmPassword" label="Confirm Password" type="password" />
							</Box>
							<Button mt={8} size="md" type="submit" isLoading={isSubmitting} colorScheme="teal">
								Submit
							</Button>
						</Form>
					)}
							</Formik>
            </Wrapper>
          </Box>
          <Box align="right"> </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
