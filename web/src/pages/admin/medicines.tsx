import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import React from "react";
import { useRouter } from "next/router";
import { Header } from "../../components/sections/Header";
import { MedicineModal } from "../../components/sections/MedicineModal";
import DataTable from 'react-data-table-component'


interface IFormInputs {
  email: string
  password: string
}


const data = [
	{name: "lek1", type:"tip1"},
	{name: "lek1", type:"tip1"},
	{name: "lek1", type:"tip1"},
	{name: "lek1", type:"tip1"},
	{name: "lek1", type:"tip1"},

]

const columns = [
	{name: "Name", selector:"name"},
	{name: "Type", selector:"type"},
	{cell: row => <div><Button size="sm" colorScheme='teal'>Update</Button></div> },
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
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <>
    <Header/>
		<Box m={10} mx={10}>
	  <DataTable
      data={data}
      columns={columns}
			selectableRows/>
		</Box>
    </>
  );
}
