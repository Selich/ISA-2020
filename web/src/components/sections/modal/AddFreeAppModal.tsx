import {
  Box, Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, SimpleGrid, Text
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { FieldError, useAddFreeAppMutation } from "../../../generated/graphql";
import { FormInput } from "../../sections/FormInput";
import { Wrapper } from "../../ui/Wrapper";

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
export const AddFreeAppModal: any = ({ onOpen, isOpen, onClose }) => {
  const [_, addFreeApp] = useAddFreeAppMutation();
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="86rem">
        <ModalHeader>
          <Text fontSize="1xl"> Register User: </Text>{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrapper variant="small">
            <Formik
              initialValues={{
                employee: "",
                from: "",
                length: 0,
                discount: 0,
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await addFreeApp(values);
                // if (response.data?.addFreeApp.errors) {
                //   setErrors(toErrorMap(response.data.addFreeApp.errors));
                //   console.log(response.data);
                // } else {
                //   console.log(response.data);
                // }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <SimpleGrid columns={2} spacing={9}>
                    <Box m={0} mr={0}>
                      <Box mt={5}>
                        <FormInput
                          name="email"
                          placeholder="email"
                          label="Email"
                        />
                      </Box>
                    <Box m={0} mr={0}>
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
        <ModalFooter>
          <Text color="gray.500" isTruncated>
            Or register using:
          </Text>
          <HStack></HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
