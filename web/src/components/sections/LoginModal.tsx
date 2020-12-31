import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import LoginForm from "./forms/LoginForm";
import { FaFacebook } from 'react-icons/fa'


export const LoginModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader><Text fontSize="3xl"> Login User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
          <Text color="gray.500" isTruncated>
          Or login using:
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
