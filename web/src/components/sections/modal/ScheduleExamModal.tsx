import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import TierForm from "../forms/TierForm";
import { FaFacebook } from 'react-icons/fa'
import ScheduleExamForm from "../forms/ScheduleExamForm";
import PatientTable from "../../tables/PatientTable";


export const ScheduleExamModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="2xl">Shedule Exam: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ScheduleExamForm onClose={onClose}/>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
