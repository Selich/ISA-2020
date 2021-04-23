import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Select,
	SimpleGrid,
	useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from 'react-datepicker';
import { usePatientQuery } from "../../generated/graphql";
import { getUserDetails } from "../../utils/getUserDetails";

const View = ({ data, scheduleConsult }) => (
  <>
    <Box p={10} m={10}>
      <Button m={2} onClick={scheduleConsult.onOpen}>
        Create Consultation
      </Button>
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
    <ScheduleConsult data disclosure={scheduleConsult} />
  </>
);

const handleSearch = () => {

}

export default function Index() {
  const scheduleConsult = useDisclosure();
  return getUserDetails(
    <View data scheduleConsult={scheduleConsult} />,
    usePatientQuery
  );
}

export const ScheduleConsult: any = ({ disclosure }) => {
  let { isOpen, onClose } = disclosure;
// nakon čega mu se prikazuje lista svih apoteka koje u tom terminu
// imaju slobodnog bar jednog farmaceuta. 
	const [startDate, setStartDate] = useState(new Date())
	const [startTime, setStartTime] = useState("00:00")
	const [endDate, setEndDate] = useState(new Date())
	const [endTime, setEndTime] = useState("00:00")

// Lista apoteka se može sortirati po ceni
// i oceni apoteke. Za svaku stavku rezultata je potrebno prikazati naziv i mesto
// apteke, njenu ocenu i cenu savetovanja.

// Korak 2: Iz liste apoteka, pacijent bira jednu nakon čega prelazi na stranicu koja
// prikazuje sve farmaceute iz odabrane apoteke koji su slobodni. Lista farmaceuta
// se može sortirati po oceni farmaceuta. Za svaku stavku rezultata je potrebno
// prikazati ime, prezime i ocenu farmaceuta.

// Korak 3: Iz liste farmaceuta, pacijent bira jednog kod kojeg zakazuje
// savetovanje. Nakon zakazivanja savetovanja, pacijentu se šalje mail o potvrdi i
// savetovanje se dodaje u listu budućih savetovanja kojoj korisnik pristupa sa
// svog profila. Savetovanje se dodaje i u radni kalendar farmaceuta.
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
            <Box mt={4}>
							<SimpleGrid columns={2} spacing={10}>
            <Box mt={4}>
							<FormControl id='startDate'>
								<FormLabel>From</FormLabel>
								<DatePicker selected={startDate} onChange={date => setStartDate(date)} />
								<Select>
									{/* @ts-ignore */}
									{[...Array(24).keys()].map(item => 
										(
											<>
										<option value={item}>{item + ":00"}</option>
										<option value={item}>{item + ":15"}</option>
										<option value={item}>{item + ":30"}</option>
										<option value={item}>{item + ":45"}</option>
										</>
										)
									)}
								</Select>
							</FormControl>
							<FormControl id='endDate'>
								<FormLabel>Until</FormLabel>
								<DatePicker selected={endDate} onChange={date => setEndDate(date)} />
								<Select>
									{/* @ts-ignore */}
									{[...Array(24).keys()].map(item => 
										(
											<>
										<option value={item}>{item + ":00"}</option>
										<option value={item}>{item + ":15"}</option>
										<option value={item}>{item + ":30"}</option>
										<option value={item}>{item + ":45"}</option>
										</>
										)
									)}
								</Select>
							</FormControl>
      <Button m={2} onClick={handleSearch}>
				Search
      </Button>
						</Box>
            <Box mt={4}>
        <DataTable
          columns={[]}
          title="Pharmacy List"
          data={[]}
          pagination
          persistTableHead
          expandableRows
        />
						</Box>
							</SimpleGrid>
						</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
