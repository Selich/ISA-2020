import {
  Box, Button, Modal,
  ModalBody, ModalContent, ModalHeader,
  ModalOverlay, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { Consultations } from "../../components/patient/Consultations";
import { EPrescriptions } from "../../components/patient/EPrescriptions";
import { Examinations } from "../../components/patient/Examinations";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import { EPrescriptionsTable } from "../../components/tables/EPrescriptionsTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";
import { usePatientQuery, useRatingDermQuery, useRatingPharmQuery } from "../../generated/graphql";
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
    <Tab>Rate</Tab>
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
            </TabPanel>
            <TabPanel>
              <Rate/>
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
// dermatologa (samo ukoliko je imao održan bar jedan pregled kod tog dermatologa),
// farmaceuta (samo ukoliko je imao održano bar jedno savetovanje kod tog farmaceuta),
// lek (samo ukoliko je bar jednom rezervisao i preuzeo lek ili mu je prepisan putem Recepta),
// apoteku (samo ukoliko je bar jednom rezervisao i preuzeo lek ili mu je prepisan putem eRecepta ili je imao održan bar jedan pregled ili jedno
// -uto.
const RateDerm = () => {
  const token = Cookies.get('token')
  const [{fetching, data}] = useRatingDermQuery({variables: {token: token}})
  const handler = (row) => {

  }
  const columns = [
    {name: "FirstName", selector:"firstName", sortable:true},
    // {name: "LastName", selector:"lastName", sortable:true},
    {name: "Rating", selector:"averageRating", sortable:true},
          {
          name: "",
          button: true,
          cell: (row: any) => (
            <Button colorScheme="red" size="sm" onClick={() => handler(row)}>
                Rate
            </Button>
          ),
        }
  ]
  let body = null
  if (fetching) body = <div>Loading</div>
  else if (!data) body = <div>Loading</div>
  else {
    if(!data.ratingDerm) body = <div>Empty</div>
    else
    body =(
    <DataTable
    data={data.ratingDerm}
    columns={columns}
    />

  )
  }
  return body
}
const RatePharm = () => {
  const token = Cookies.get('token')
  const [{fetching, data}] = useRatingDermQuery({variables: {token: token}})
  const handler = (row) => {

  }
  const columns = [
    {name: "FirstName", selector:"firstName", sortable:true},
    // {name: "LastName", selector:"lastName", sortable:true},
    {name: "Rating", selector:"averageRating", sortable:true},
          {
          name: "",
          button: true,
          cell: (row: any) => (
            <Button colorScheme="red" size="sm" onClick={() => handler(row)}>
                Rate
            </Button>
          ),
        }
  ]
  let body = null
  if (fetching) body = <div>Loading</div>
  else if (!data) body = <div>Loading</div>
  else {
    if(!data.ratingDerm) body = <div>Empty</div>
    else
    body =(
    <DataTable
    data={data.ratingDerm}
    columns={columns}
    />

  )
  }
  return body
}
const RateMedicine = () => {
  return (
    <div>Test</div>
  )
}
const RatePharmacy = () => {
  return (
    <div>Test</div>
  )
}
const Rate = () => {
  return (
    <Tabs>

  <TabList>
    <Tab>Examinations</Tab>
    <Tab>Consultation</Tab>
    <Tab>E-Prescriptions</Tab>
    <Tab>Reservations</Tab>
    </TabList>
    <TabPanel><RateDerm/></TabPanel>
    <TabPanel><RatePharm/></TabPanel>
    <TabPanel><RateMedicine/></TabPanel>
    <TabPanel><RatePharmacy/></TabPanel>
   </Tabs>

  )
}

export default function Index() {
  return getUserDetails(<View data />, usePatientQuery);
}
