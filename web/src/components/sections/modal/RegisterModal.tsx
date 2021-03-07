import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import RegisterForm from "../forms/RegisterForm";

export const RegisterModal: any = ({ onOpen, isOpen, onClose }) => {
  return (
    <Modal scrollBehavior='inside' size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent >
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

};
