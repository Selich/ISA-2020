import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, useDisclosure } from "@chakra-ui/react";
import React from "react";
import DataTable from "react-data-table-component";
import CreateAdminForm from "../../components/sections/forms/CreateAdminForm";
import { usePatientQuery } from "../../generated/graphql";
import { getUserDetails } from "../../utils/getUserDetails";

const View = ({ data, scheduleExam, scheduleConsult }) => (
	<>
  <Box p={10} m={10}>
		<Button m={2} onClick={scheduleExam.onOpen}>Create Examination</Button>
		<Button m={2} onClick={scheduleConsult.onOpen}>Create Consultation</Button>
    <DataTable
      columns={[]}
      data={[]}
      pagination
      subHeader
      expandableRows
      persistTableHead
      // expandableRowsComponent={<ExpandedComponent data={this} />}
    />
  </Box>
      <ScheduleExam
				data
				disclosure={scheduleExam}
      />
      <ScheduleConsult
				data
				disclosure={scheduleConsult}
      />
	</>
);

export default function Index() {
  const scheduleExam = useDisclosure()
  const scheduleConsult = useDisclosure()
  return getUserDetails(
	<View 
		data 
		scheduleExam={scheduleExam} 
		scheduleConsult={scheduleConsult} 
	/>, usePatientQuery);
}

export const ScheduleExam: any = ({ disclosure }) => {
	let {isOpen, onClose} = disclosure
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <CreateAdminForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const ScheduleConsult: any = ({disclosure}) => {
	let {isOpen, onClose} = disclosure
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <CreateAdminForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};