import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import CreateAppointmentForm from "../forms/CreateAppointmenForm";


export const CreateAppointmentModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="3xl">Create Tier: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateAppointmentForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};