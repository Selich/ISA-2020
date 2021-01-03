import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from 'react-icons/fa'
import RegisterForm from "../forms/RegisterForm";


export const RegisterModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader><Text fontSize="3xl"> Register User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
          <Text color="gray.500" isTruncated>
          Or register using:
          </Text>
          <HStack>
            <Button size="sm" m={7} colorScheme="facebook" leftIcon={<FaFacebook />}>
              Facebook
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
