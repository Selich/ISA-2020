import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FormInput } from "./../../../components/sections/FormInput";
import { FormInputPassword } from "./../../../components/sections/FormInputPassword";
import { Wrapper } from "./../../../components/ui/Wrapper";
import { toErrorMap } from "../../../utils/errorMap";
import { useLoginMutation } from "../../../generated/graphql";
import { initCart } from '../../../utils/cart'

import Cookies from 'js-cookie'

const roles = {
  'employees': ['pharm', 'derm', 'admin', 'sysadmin'],
  'all': ['patient','pharm', 'derm', 'admin', 'sysadmin'],
}

export default function LoginForm({ onClose, setUser }) {
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
          } else if (response.data?.login.token) {
            let { token, user } = response.data.login
            console.log(response.data.login);
            Cookies.set('token', token)
            setUser(user)
            initCart()
            if (roles.employees.includes(user.role) && !user.isEnabled)
                router.push("/fstlogin");
            else if(roles.all.includes(user.role))
                router.push('/' + user.role);
            onClose()
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