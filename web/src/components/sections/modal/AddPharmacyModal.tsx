import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";


export const AddPharmacyModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent minW="86rem" >
        <ModalHeader><Text fontSize="1xl"> Register User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
						Test
        </ModalBody>
      </ModalContent>
    </Modal>
  );

};
