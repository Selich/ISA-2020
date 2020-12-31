import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import React from "react";
import { useRouter } from "next/router";
import { Header } from "../../components/sections/Header";
import { MedicineModal } from "../../components/sections/MedicineModal";


interface IFormInputs {
  email: string
  password: string
}


const medicines = [
	{name: "lek1", type:"tip1", price:200},
	{name: "lek1", type:"tip1", price:200},
	{name: "lek1", type:"tip1", price:200},
	{name: "lek1", type:"tip1", price:200}

]

export default function Medicines() {
  const medicineModal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
 const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);
 const [isActive, setIsActive] = React.useState(true);

 const handleChange = event => {
    setSearchTerm(event.target.value);
  };
 React.useEffect(() => {
    const results = medicines.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <>
    <Header/>
			<Center>
		<Flex  m={10} minW="90%">
				<Box>
				<FormLabel >Search:</FormLabel>
				<Input
					mt={0}
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={handleChange}
				/>
			</Box>
				<HStack>
				<FormLabel >Activated?</FormLabel>
				<Switch />
			</HStack>
				<Box>
				<FormLabel >Type:</FormLabel>
				<Select placeholder="All">
					{[... new Set(medicines.map(item => item.type))].map(item => (
						<option value={item}>{item}</option>

					))}
				</Select>
			</Box>
			</Flex>
		  </Center>
			<Center>
			<Table variant="simple" maxW="80%">
				<Thead>
					<Tr>
						<Th>Medicine</Th>
						<Th>Type</Th>
						<Th isNumeric>Price</Th>
					</Tr>
				</Thead>
				<Tbody>
				{medicines.map(item => (
					<Tr onClick={() => alert("test")}>
						<Td>{item.name}</Td>
						<Td>{item.type}</Td>
						<Td isNumeric>{item.price}</Td>
						<Button m={3} size="sm" colorScheme="red"
								onClick={() => medicines.push(item)}
						>X</Button>
					</Tr>

				))}
				</Tbody>
			</Table>
		</Center>
      <MedicineModal
        onOpen={medicineModal.onOpen}
        isOpen={medicineModal.isOpen}
        onClose={medicineModal.onClose}
      />
    </>
  );
}
