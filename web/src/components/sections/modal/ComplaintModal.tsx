import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import ComplaintForm from "../forms/ComplaintForm";
import HolidayForm from "../forms/HolidayForm";


export const ComplaintModal: any = ({ medicines, onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="xl">Confirm Contents: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
                  <ComplaintForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
            <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
