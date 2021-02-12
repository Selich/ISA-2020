import { Formik, Form } from "formik";
import { FieldError, useAddEmployeeMutation } from "../../../generated/graphql";
import { FormInput } from "../../sections/FormInput";
import { Wrapper } from "../../ui/Wrapper";
import {
  SimpleGrid,
  Box,
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
export const AddDermModal: any = ({ onOpen, isOpen, onClose }) => {
  const [, addEmployee] = useAddEmployeeMutation();
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent minW="86rem" minH="25rem">
        <ModalHeader>
          <Text fontSize="1xl"> Add User: </Text>{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrapper variant="small">
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                role: "derm",
                lastName: "",
                telephone: "",
              }}
              onSubmit={async (values, { setErrors }) => {
								let inputs = {...values}
								const response = await addEmployee({
									inputs: inputs
								});
								console.log(response)
                if (response.data?.addEmployee.errors) {
                  setErrors(toErrorMap(response.data.register.errors));

                } else {
                  swal({
                    title: "Employee created",
                    text: "Email has been sent to new employee",
                    icon: "success",
                  });
                  onClose();
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
									<SimpleGrid columns={3} m={-50} mx={-80} spacing={9}>
                    <Box m={0} mr={0}>
                      <Box mt={5}>
                        <FormInput
                          name="email"
                          placeholder="email"
                          label="Email"
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
                    </Box>
                    <Box m={0} mr={0}>
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
