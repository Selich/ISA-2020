import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from 'react-icons/fa'
import EditProfileForm from "../forms/EditProfileForm";


export const EditProfileModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent minW="86rem" >
        <ModalHeader><Text fontSize="1xl"> Update User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditProfileForm onClose={onClose}/>
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
