import React from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import LoginForm from "../forms/LoginForm";

export const LoginModal: any = ({ isOpen, onClose, setUser }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <LoginForm onClose={onClose} setUser={setUser}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
