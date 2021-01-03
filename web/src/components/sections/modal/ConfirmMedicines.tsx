import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import PrescriptionTable from "../../layouts/pharmacy/PrescriptionTable";
import HolidayForm from "../forms/HolidayForm";


export const ConfirmMedicinesModal: any = ({ medicines, onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="xl">Confirm Contents: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
                <PrescriptionTable medicines={medicines}/>
        </ModalBody>
        <ModalFooter >
            <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
