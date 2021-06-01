import {
  Box, Modal,
  ModalBody, ModalContent, ModalHeader,
  ModalOverlay, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { Consultations } from "../../components/patient/Consultations";
import { EPrescriptions } from "../../components/patient/EPrescriptions";
import { Examinations } from "../../components/patient/Examinations";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import { EPrescriptionsTable } from "../../components/tables/EPrescriptionsTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";
import { usePatientQuery } from "../../generated/graphql";
import { getUserDetails } from "../../utils/getUserDetails";
import { MyDateInput, MyTimeInput } from '../../utils/utils';

const SelectedPharmModal: any = ({isOpen, onClose, onOpen, selectedPharmacy}) => {
	const [selectedEmployee, setSelectedEmployee] = useState()

	if(!selectedPharmacy) return <div></div>

	return (
      <Modal isOpen={isOpen} onClose={onClose} size="">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>
            <Text fontSize="xl">{selectedPharmacy.name}</Text>
            <Text fontSize="xl">Select Pharmacist: </Text>
          </ModalHeader>
					<ModalBody>
						<EmployeeTable handler={setSelectedEmployee} action='select' kind={'derm'} pharmacy={selectedPharmacy}/>
					</ModalBody>
        </ModalContent>
      </Modal>

	);
};

const ScheduleConsultations = () => {
	const [selectedDate, setSelectedDate] = useState({day: '', month: '' , year: ''})
	const [selectedPharmacy, setSelectedPharmacy] = useState()
  const pharmModal = useDisclosure();

	useEffect(() => {}, [selectedPharmacy])

	return (
		<>
			<SimpleGrid columns={2} spacing={2}>
				<Box>
						Date:
						<MyDateInput setter={setSelectedDate}/>
						Time:
						<MyTimeInput setter={setSelectedDate}/>
				</Box>
				<Box>
					{/** @ts_ignore **/}
					{/* <PharmaciesTable onOpen={pharmModal.onOpen} kind={'schedule'}  setSelectedPharmacy={setSelectedPharmacy}/> */}
				</Box>
			</SimpleGrid>
			<SelectedPharmModal
				selectedPharmacy={selectedPharmacy}
        onOpen={pharmModal.onOpen}
        isOpen={pharmModal.isOpen}
        onClose={pharmModal.onClose}
			/>
			</>
	)

}

const TabMenu = () => (
  <TabList>
    <Tab>Examinations</Tab>
    <Tab>Consultation</Tab>
    <Tab>E-Prescriptions</Tab>
    <Tab>Reservations</Tab>
    <Tab>Subscriptions</Tab>
    <Tab>Profile</Tab>
  </TabList>
);

const View = ({ data }) => (
  <>
    <Box m="4" p="8" fontSize="2rem">
      <Box>
        <PatientDetails data={data} />
        <hr />
        <Tabs isFitted colorScheme="green">
          <TabMenu />
          <TabPanels>
            <TabPanel>
              <Examinations/>
            </TabPanel>
            <TabPanel>
              <Consultations/>
            </TabPanel>
            <TabPanel>
              <EPrescriptions/>
            </TabPanel>
            <TabPanel>
              <ReservationsTable />
            </TabPanel>
            <TabPanel>
              <SubscriptionTable data={data} />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  </>
);
// TODO: FIX PATIENT PROFILE

export default function Index() {
  return getUserDetails(<View data />, usePatientQuery);
}
