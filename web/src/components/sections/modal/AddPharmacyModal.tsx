import {
  Box, Button, Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalHeader,
  ModalOverlay, SimpleGrid, Text
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useCreatePharmacyMutation } from '../../../generated/graphql';
import { FormInput } from "../../sections/FormInput";
import { Wrapper } from "../../ui/Wrapper";

export const AddPharmacyModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef();
  const [_, createPharmacy] = useCreatePharmacyMutation();
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent>
        <ModalHeader>
          <Text fontSize="1xl">Create Pharmacy: </Text>{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrapper variant="small">
            <Formik
              initialValues={{
                name: "",
                street: "",
                country: "",
                city: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                // const response = await createPharmacy(values);
                // if (response.data?.createPharmacy.errors) {
                //   setErrors(toErrorMap(response.data.createPharmacy.errors));

                //   console.log(response.data);
                // } else {
								// 	onClose()
                // }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <SimpleGrid columns={1} spacing={5}>
                    <Box m={0} mr={0}>
                      <FormInput name="name" placeholder="name" label="Name" />
                      <FormInput
                        name="street"
                        placeholder="Street"
                        label="Street"
                      />
                      <FormInput name="city" placeholder="City" label="City" />
                      <FormInput
                        name="country"
                        placeholder="Country"
                        label="Country"
                      />
                    </Box>
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Create
                    </Button>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
