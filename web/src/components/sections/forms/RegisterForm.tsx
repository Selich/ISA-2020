import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import swal from "sweetalert";
import { useRegisterMutation } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/errorMap";
import { FormInput } from "../../sections/FormInput";
import { FormInputPassword } from "../../sections/FormInputPassword";
import { Wrapper } from "../../ui/Wrapper";

export default function RegisterLayout({ onClose }) {
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
          role: "patient",
          address: {
            street: "",
            city: "",
            country: "",
          },
          telephone: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          let inputs = values
          const response = await register({inputs});
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));

            console.log(response.data);
          } else {
            router.push("/");
            swal({
              title: "Mail has been sent!",
              text: "Confirm your account by clicking on the button below",
              icon: "success",
              buttons: ['Cancel', 'Go to link']
            }).then(res => {
              router.push(response.data.register.token)
            });
            onClose()

          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput name="email" placeholder="email" label="Email" />
            <FormInputPassword name="password" placeholder="password" label="Password" type="password" />
            <FormInputPassword name="confirmPassword" placeholder="confirmPassword" label="Confirm Password" type="password" />
            <FormInput name="firstName" placeholder="First Name" label="First Name" />
            <FormInput name="lastName" placeholder="Last Name" label="Last Name" />
            <FormInput name="telephone" placeholder="+38160123456" label="Telephone" />
            <FormInput name="address.street" placeholder="address" label="Address" />
            <FormInput name="address.city" placeholder="city" label="City" />
            <FormInput name="address.country" placeholder="country" label="Country" />
            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal" > 
              Register
             </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
