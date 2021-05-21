import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Button,
  SimpleGrid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { safeLoading, MyNumberInput, MyDateInput } from "../../utils/utils";
import { useEmployeeQuery } from "../../generated/graphql";
import { useGetEmployeesByPharmQuery } from "../../generated/graphql";
import { PatientProfile } from "../../components/layouts/patient/PatientProfile";
import { PharmacyProfile } from "../../components/layouts/PharmacyProfile";
import { PharmaciesTable } from "../../components/tables/PharmaciesTable";
import { FreeExamsTable } from "../../components/tables/FreeExamsTable";
import { FreeDermTable } from "../../components/tables/FreeDermTable";
import MedicinesTable from "../../components/tables/MedicinesTable";
import { HistoryTableDerm } from "../../components/tables/HistoryTableDerm";
import { EPrescriptionsTable } from "../../components/tables/EPrescriptionsTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";

const TabMenu = () => (
  <TabList>
    <Tab>Pharmacy</Tab>
    <Tab>Examinations</Tab>
    <Tab>Dermatologists</Tab>
    <Tab>Pharmacists</Tab>
    <Tab>Medicines</Tab>
    <Tab>Prices</Tab>
    <Tab>Reports</Tab>
  </TabList>
);

const View = ({ data }) => (
  <>
    <Box m="4" p="8" fontSize="2rem">
      <Box align="center">
        <hr />
        <Tabs isFitted variant="soft-rounded" colorScheme="green">
          <TabMenu />
          <TabPanels>
            <TabPanel>
              <PharmacyProfile pharm={{ id: 20 }} />
            </TabPanel>
            <TabPanel>
              <HistoryTableDerm />
            </TabPanel>
            <TabPanel>
              <PharmaciesTable user={data} />
            </TabPanel>
            <TabPanel>
              <EPrescriptionsTable />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel>
              <SubscriptionTable data={data} />
            </TabPanel>
            <TabPanel>
              <PatientProfile />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  </>
);
// derm
// date and time
// trajanje
// popust
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const FreeExamModal: any = ({ user, isOpen, onClose, onOpen }) => {
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [quantity, setQuantity] = useState(1);
	const [derm, setDerm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		workingHours: {
			from: '',
			until: ''
		},

	});

	let [{ fetching, data }] = useGetEmployeesByPharmQuery({
		variables: {
			inputs: {
				pharmacy: user.pharmacy.id + ''
			}
		}
	})

	console.log(data)

	let body = null;
  if (fetching) body = <p>loading...</p>;
	else if (!data) body = <p> test </p>
	else{
    body = (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={3} spacing={5}>
            <Box align="left">
							<FreeDermTable setDerm={setDerm} data={data.getEmployeesByPharm}/>
            </Box>
            <Box align="right">
							<Text textAlign="center" fontSize="24px" p={3}>
							{derm.firstName} {derm.lastName}
							</Text>
							<Text textAlign="center" fontSize="21px" p={3}>
							{derm.email}
							</Text>
							<Text textAlign="center" fontSize="21px" p={3}>
							{derm.workingHours.from} {derm.workingHours.until}
							</Text>
            </Box>
            <Box align="left" pt={20} colorScheme="teal">
              Date:
              <MyDateInput setter={setSelectedDate} />
              Trajanje:
              <MyNumberInput
                setter={setQuantity}
                defaultValue={quantity}
                min={1}
                max={20}
              />
              Popust:
              <MyNumberInput
                setter={setQuantity}
                defaultValue={quantity}
                min={1}
                max={20}
              />
								<Button isFullWidth>
										Submit
								</Button>
            </Box>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
    );

	}

  return body
};

export default function Index() {
	let token = Cookies.get('token')
  const freeExamModal = useDisclosure();
	let [{ fetching, data }] = useEmployeeQuery({
		variables: {
			token: token
		}
	})
	let body = null
	if (fetching) body = (<p> Loading </p>)
	else if (!data) body = (<p> Loading </p>)
	else if (data.employee) {
		body = (
    <Box m="4" p="8" fontSize="2rem">
      <Box align="center">
        <hr />
        <Tabs isFitted variant="soft-rounded" colorScheme="green">
          <TabMenu />
          <TabPanels>
            <TabPanel>
              <HistoryTableDerm />
            </TabPanel>
            <TabPanel>
              <Button onClick={() => freeExamModal.onOpen()}>
                Schedule Free Examination +
              </Button>
              <FreeExamsTable />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel>
              <EPrescriptionsTable />
            </TabPanel>
            <TabPanel>
              <MedicinesTable />
            </TabPanel>
            <TabPanel>
              <ReservationsTable />
            </TabPanel>
            <TabPanel>
              <PatientProfile />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <FreeExamModal
        user={data.employee}
        onOpen={freeExamModal.onOpen}
        isOpen={freeExamModal.isOpen}
        onClose={freeExamModal.onClose}
      />
    </Box>
  );

	}
		return body

}
