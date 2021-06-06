import React, { useEffect, useState } from "react";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useConfirmPasswordMutation } from "../generated/graphql";
import { toErrorMap } from '../utils/errorMap';
import { FormInput } from "./../components/sections/FormInput";
import { FormInputPassword } from "./../components/sections/FormInputPassword";
import { Wrapper } from "./../components/ui/Wrapper";
import { Paper } from "../components/ui/Paper";

export default function FstLogin() {
  const [, confirmPassword] = useConfirmPasswordMutation();
  const router = useRouter();

  return (
    <>
      <Paper>
        <SimpleGrid columns={3} spacing={0} maxH="600px">
          <Box align="left"> </Box>
          <Box align="center">
            <Wrapper variant="small">
              <Formik
                initialValues={{ oldPass: "", passsword: "", confirmPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                  // @ts-ignore
                  const response = await confirmPassword(values);

                  // @ts-ignore
                  if (response.data?.login.errors) {
                  // @ts-ignore
                    setErrors(toErrorMap(response.data.login.errors));
                  // @ts-ignore
                  } else if (response.data?.login.user) {
                  // @ts-ignore
                    let user = response.data.login.user;
                  // @ts-ignore
                    let token = response.data.login.token;
                  // @ts-ignore
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
      </Paper>
    </>
  );
}
