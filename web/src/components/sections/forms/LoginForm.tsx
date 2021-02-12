import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Select,
  Stack,
} from "@chakra-ui/react";
// import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useState } from "react";
import { FormInput } from "./../../../components/sections/FormInput";
import { FormInputPassword } from "./../../../components/sections/FormInputPassword";
import { Wrapper } from "./../../../components/ui/Wrapper";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FieldError, useLoginMutation } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/errorMap";

export default function LoginForm({ onClose }) {
  const [{ fetching: loginFetch }, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            let user = response.data.login.user;
            let token = response.data.login.token;
            localStorage.setItem("cart", JSON.stringify({}));
            localStorage.setItem("token", JSON.stringify(token));
            if (
              (user.role === "admin" ||
                user.role === "pharm" ||
                user.role === "derm") &&
              !user.isEnabled
            )
              router.push("/fstlogin");
            if (user.role !== "sysadmin" && !user.isEnabled)
              if (user.role === "patient") router.push("/user");
            if (user.role === "derm") router.push("/derm");
            if (user.role === "pharm") router.push("/pharm");
            if (user.role === "admin") router.push("/admin");
            if (user.role === "sysadmin") router.push("/sysadmin");
            onClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <FormInput name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <FormInputPassword
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
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
