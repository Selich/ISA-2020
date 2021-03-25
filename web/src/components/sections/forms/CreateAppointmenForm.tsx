
import { useDisclosure, ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, SimpleGrid, Text, Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
import React from "react";
import {PharmaciesTable} from '../../tables/PharmaciesTable'
import { useState } from "react";
import { FormInput } from './../../../components/sections/FormInput';
import { FormInputPassword } from './../../../components/sections/FormInputPassword';
import { Wrapper }  from './../../../components/ui/Wrapper';
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FieldError, useLoginMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/errorMap';


export default function CreateAppointmentForm({onClose}) {
	const [{ fetching: loginFetch }, login] = useLoginMutation();
  const router = useRouter();
	const pharmList = useDisclosure()
  return (
		<>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
						//         const response = await login(values);
            // @ts-ignore
            // if (response.data?.login.errors) {
            // // @ts-ignore
            //   console.log(response.data.login.errors);
            // // @ts-ignore
            //   setErrors(toErrorMap(response.data.login.errors));
            // } else if (response.data?.login.user) {
            //   let user = response.data.login.user
            // // @ts-ignore
            //   // router.push(`/${user.role}/${user.id}`);
            //   onClose()
            //   router.reload() }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
            <SimpleGrid columns={2} spacing={8} >
                <Box m={6} mr={9} >
									<Button onClick={() => pharmList.onOpen() }>Pharmacy</Button>
                    <Text>left</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </Box>
                <Box m={6}>
                    <Text>right</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </Box>
            </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <PharmModal
        onOpen={pharmList.onOpen}
        isOpen={pharmList.isOpen}
        onClose={pharmList.onClose}
            />
				</>
    );
}

const PharmModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent maxW="26rem" maxH="26rem">
        <ModalHeader><Text fontSize="3xl">Choose Pharm: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
					<PharmaciesTable/>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
