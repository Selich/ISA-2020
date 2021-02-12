import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from 'react-icons/fa'
import RegisterForm from "../forms/RegisterForm";


export const RegisterModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent minW="86rem" >
        <ModalHeader><Text fontSize="1xl"> Register User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
          <Text color="gray.500" isTruncated>
          Or register using:
          </Text>
          <HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
