import {
  Box, Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PatientComplaints } from "../../components/employee/PatientComplaints";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { Consultations } from "../../components/patient/Consultations";
import { EPrescriptions } from "../../components/patient/EPrescriptions";
import { Examinations } from "../../components/patient/Examinations";
import { Rate } from "../../components/patient/Rate";
import { Subscription } from "../../components/patient/Subscriptions";
import { Profile } from "../../components/Profile";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import { PrescriptionTable } from "../../components/tables/PrescriptionTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { MyDateInput, MyTimeInput } from "../../utils/utils";

const TabMenu = () => (
  <TabList>
    <Tab>Examinations</Tab>
    <Tab>Consultation</Tab>
    <Tab>Prescriptions</Tab>
    <Tab>E-Prescriptions</Tab>
    <Tab>Reservations</Tab>
    <Tab>Subscriptions</Tab>
    <Tab>Complaints</Tab>
    <Tab>Rate</Tab>
    <Tab>Profile</Tab>
  </TabList>
);

export default function Index() {
  return (
    <>
      <Box m="4" p="8" fontSize="2rem">
        <Box>
          <PatientDetails />
          <hr />
          <Tabs isFitted colorScheme="green">
            <TabMenu />
            <TabPanels>
               <TabPanel>
                <Examinations />
              </TabPanel> 
              <TabPanel>
                <Consultations />
              </TabPanel>
              <TabPanel>
                <PrescriptionTable />
              </TabPanel>
              <TabPanel>
                <EPrescriptions />
              </TabPanel>
              <TabPanel>
                <ReservationsTable />
              </TabPanel>
              <TabPanel>
                <Subscription/>
                </TabPanel>
              <TabPanel>
                <PatientComplaints/>
              </TabPanel>
              <TabPanel>
                <Rate />
              </TabPanel> 
              <TabPanel>
                <Profile/>
              </TabPanel> 
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

const SelectedPharmModal: any = ({
  isOpen,
  onClose,
  selectedPharmacy,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState();

  if (!selectedPharmacy) return <div></div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">{selectedPharmacy.name}</Text>
          <Text fontSize="xl">Select Pharmacist: </Text>
        </ModalHeader>
        <ModalBody>
          <EmployeeTable
            handler={setSelectedEmployee}
            action="select"
            kind={"derm"}
            pharmacy={selectedPharmacy}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ScheduleConsultations = () => {
  const [selectedDate, setSelectedDate] = useState({
    day: '', month: '' , year: ''})
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
