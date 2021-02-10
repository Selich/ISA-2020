import {
  Text,
	Select,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";
import { SimpleGrid, Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { FieldError, useRegisterMutation } from "../../../generated/graphql";
import { FormInput } from "../../sections/FormInput";
import { FormInputPassword } from "../../sections/FormInputPassword";
import swal from "sweetalert";
import { Wrapper } from "../../ui/Wrapper";
import { usePharmaciesQuery, useAddEmployeeMutation } from '../../../generated/graphql';

export const AddDermModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef();
  const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
      errorMap[field] = message;
    });

    return errorMap;
  };
  const [, addEmployee] = useAddEmployeeMutation();
  const [{fetching, data}] = usePharmaciesQuery();
  const router = useRouter();
	let select = null
	if(fetching){

	} else if (!data.pharmacies){
			select = <p> loading </p>
	} else {
		select = 
			data.pharmacies.map(item => 
			<option>{item.name}</option>
			)
			

		}


  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>
          <Text fontSize="1xl"> Register Admin: </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrapper variant="small">
            <Formik
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                street: "",
                city: "",
                country: "",
                telephone: "",
								pharmacyName: "",
								role: "derm",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await addEmployee(values);
								console.log(response)
                if (response.data?.addEmployee.errors) {
                  setErrors(toErrorMap(response.data.addEmployee.errors));

                  console.log(response.data);
                } else {
                  console.log(response.data);
                  swal({
                    title: "Admin created!",
                    text: "Confirmation mail sent",
                    icon: "success",
                  });
									onClose()
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <SimpleGrid columns={3} spacing={2}>
                    <Box m={0} mr={0}>
                      <Box mt={5}>
                        <FormInput
                          name="email"
                          placeholder="email"
                          label="Email"
                        />
                      </Box>
                      <Box mt={5}>
                        <FormInputPassword
                          name="password"
                          placeholder="password"
                          label="Password"
                          type="password"
                        />
                      </Box>
                    </Box>
                    <Box m={0} mr={0}>
                      <Box mt={5}>
                        <FormInput
                          name="firstName"
                          placeholder="First Name"
                          label="First Name"
                        />
                      </Box>
                      <Box mt={5}>
                        <FormInput
                          name="lastName"
                          placeholder="Last Name"
                          label="Last Name"
                        />
                      </Box>
                      <Box mt={5}>
                        <FormInput
                          name="telephone"
                          placeholder="+38160123456"
                          label="Telephone"
                        />
                      </Box>
                    </Box>
                    <Box m={0} mr={0}>
                      <Box mt={5}>
                        <FormInput
                          name="street"
                          placeholder="address"
                          label="Address"
                        />
                      </Box>
                      <Box mt={5}>
                        <FormInput
                          name="city"
                          placeholder="city"
                          label="City"
                        />
                      </Box>
                      <Box mt={5}>
                        <FormInput
                          name="country"
                          placeholder="country"
                          label="Country"
                        />
                      </Box>
                    </Box>
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Register
                    </Button>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
